import os
import sys
import json
import urllib.request
import subprocess
from PIL import Image, ImageEnhance, ImageStat

BASE_DIR = "/Users/sifat/Project/Le_Velair_Shopify/homepage_product_images"
ORIGINAL_DIR = os.path.join(BASE_DIR, "original")
ENHANCED_DIR = os.path.join(BASE_DIR, "enhanced")

os.makedirs(ORIGINAL_DIR, exist_ok=True)
os.makedirs(ENHANCED_DIR, exist_ok=True)

query = """
query {
  c_new: collectionByHandle(handle: "new") {
    id
    title
    handle
    products(first: 8) {
      nodes {
        id
        title
        handle
        images(first: 20) {
          nodes {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
  }
  c_engravable: collectionByHandle(handle: "engravable-jewelry") {
    id
    title
    handle
    products(first: 8) {
      nodes {
        id
        title
        handle
        images(first: 20) {
          nodes {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
  }
  c_rings: collectionByHandle(handle: "rings") {
    id
    title
    handle
    products(first: 8) {
      nodes {
        id
        title
        handle
        images(first: 20) {
          nodes {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
  }
}
"""

print("Executing Shopify GraphQL query...")
res = subprocess.run(
    ["shopify", "store", "execute", "--store", "le-velair-w6ickwvy.myshopify.com", "--query", query, "--json"],
    capture_output=True,
    text=True
)

raw = res.stdout
json_start = raw.find("{\n  \"c_new\":")
if json_start == -1:
    lines = raw.split("\n")
    json_lines = []
    started = False
    for line in lines:
        if line.strip().startswith("{") and not "progress" in line:
            started = True
        if started:
            json_lines.append(line)
    raw_json = "\n".join(json_lines)
else:
    raw_json = raw[json_start:]

data = json.loads(raw_json)

# Save metadata
with open(os.path.join(BASE_DIR, "homepage_products_metadata.json"), "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def enhance_image(input_path, output_path):
    with Image.open(input_path) as img:
        # Convert to RGB if needed (handling RGBA or palette)
        if img.mode in ('RGBA', 'LA'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1])
            img_rgb = background
        elif img.mode != 'RGB':
            img_rgb = img.convert('RGB')
        else:
            img_rgb = img.copy()

        # Calculate luminance to determine adaptive brightness boost
        stat = ImageStat.Stat(img_rgb)
        mean_lum = sum(stat.mean) / 3.0

        # If image is relatively dark (< 130), boost by 25%
        # If image is medium (130-190), boost by 18%
        # If image is already quite bright (> 190), boost by 10%
        if mean_lum < 130:
            brightness_factor = 1.25
        elif mean_lum < 190:
            brightness_factor = 1.18
        else:
            brightness_factor = 1.10

        # 1. Enhance Brightness
        enhancer = ImageEnhance.Brightness(img_rgb)
        brightened = enhancer.enhance(brightness_factor)

        # 2. Enhance Contrast to keep shadows and jewelry definitions sharp
        enhancer = ImageEnhance.Contrast(brightened)
        contrasted = enhancer.enhance(1.12)

        # 3. Enhance Sharpness so jewelry facets, metals, chains, and engravings pop
        enhancer = ImageEnhance.Sharpness(contrasted)
        sharpened = enhancer.enhance(1.25)

        # 4. Enhance Color (vibrance) slightly so gold shines warmly and gems sparkle
        enhancer = ImageEnhance.Color(sharpened)
        final_img = enhancer.enhance(1.08)

        final_img.save(output_path, "JPEG", quality=95, optimize=True)

download_count = 0
enhanced_count = 0

for coll_key, coll_label in [("c_new", "new_arrivals"), ("c_engravable", "engravable"), ("c_rings", "rings")]:
    coll = data[coll_key]
    coll_title = coll["title"]
    products = coll["products"]["nodes"]
    print(f"\nProcessing Collection: {coll_title} ({len(products)} products)...")

    coll_orig_dir = os.path.join(ORIGINAL_DIR, coll_label)
    coll_enh_dir = os.path.join(ENHANCED_DIR, coll_label)
    os.makedirs(coll_orig_dir, exist_ok=True)
    os.makedirs(coll_enh_dir, exist_ok=True)

    for p_idx, prod in enumerate(products, 1):
        p_handle = prod["handle"]
        p_title = prod["title"]
        images = prod["images"]["nodes"]
        print(f"  [{p_idx}/8] {p_title} ({p_handle}) - {len(images)} images")

        for img_idx, img_obj in enumerate(images, 1):
            img_url = img_obj["url"]
            # Clean URL: strip query parameters for extension detection
            base_url = img_url.split("?")[0]
            ext = os.path.splitext(base_url)[1] or ".jpg"
            if ext.lower() not in ('.jpg', '.jpeg', '.png', '.webp'):
                ext = ".jpg"

            filename = f"{p_idx:02d}_{p_handle}_{img_idx:02d}{ext}"
            orig_filepath = os.path.join(coll_orig_dir, filename)
            enh_filepath = os.path.join(coll_enh_dir, f"{p_idx:02d}_{p_handle}_{img_idx:02d}.jpg")

            # Download if not already present
            if not os.path.exists(orig_filepath) or os.path.getsize(orig_filepath) == 0:
                try:
                    req = urllib.request.Request(img_url, headers=headers)
                    with urllib.request.urlopen(req) as resp, open(orig_filepath, "wb") as out_f:
                        out_f.write(resp.read())
                    download_count += 1
                except Exception as e:
                    print(f"    Error downloading {img_url}: {e}")
                    continue
            else:
                download_count += 1

            # Enhance image
            try:
                enhance_image(orig_filepath, enh_filepath)
                enhanced_count += 1
            except Exception as e:
                print(f"    Error enhancing {orig_filepath}: {e}")

print(f"\nCompleted! Total downloaded: {download_count}, Total enhanced: {enhanced_count}")
