import os
import math
from PIL import Image

ASSETS_DIR = "/Users/sifat/Project/Le_Velair_Shopify/assets"
ARTIFACT_DIR = "/Users/sifat/.gemini/antigravity/brain/360c4548-2eaf-46e2-8ed7-c94f399ed28e"

logos_to_process = [
    {
        "src": os.path.join(ASSETS_DIR, "le_velair_luxury_logo.jpg"),
        "dest_name": "le_velair_luxury_logo_transparent.png",
        "thresh_low": 16,
        "thresh_high": 42
    },
    {
        "src": os.path.join(ASSETS_DIR, "maison_aurelia_luxury_logo_1793365985752.jpg"),
        "dest_name": "maison_aurelia_luxury_logo_transparent.png",
        "thresh_low": 15,
        "thresh_high": 38
    },
    {
        "src": os.path.join(ASSETS_DIR, "valoire_fine_jewelry_logo_1793366014637.jpg"),
        "dest_name": "valoire_fine_jewelry_logo_transparent.png",
        "thresh_low": 16,
        "thresh_high": 40
    },
    {
        "src": os.path.join(ASSETS_DIR, "maison_aurelia_header_logo_1793366089161.jpg"),
        "dest_name": "maison_aurelia_header_logo_transparent.png",
        "thresh_low": 14,
        "thresh_high": 36
    },
    {
        "src": os.path.join(ASSETS_DIR, "valoire_header_logo_1793366114946.jpg"),
        "dest_name": "valoire_header_logo_transparent.png",
        "thresh_low": 14,
        "thresh_high": 36
    }
]

def make_transparent(src_path, dest_path, thresh_low=16, thresh_high=40):
    if not os.path.exists(src_path):
        print(f"Skipping {src_path} (not found)")
        return
        
    img = Image.open(src_path).convert('RGB')
    w, h = img.size
    
    # Estimate background color from outer border
    border_pixels = []
    step = max(1, w // 200)
    for x in range(0, w, step):
        border_pixels.append(img.getpixel((x, 0)))
        border_pixels.append(img.getpixel((x, 1)))
        border_pixels.append(img.getpixel((x, h-1)))
        border_pixels.append(img.getpixel((x, h-2)))
    for y in range(0, h, step):
        border_pixels.append(img.getpixel((0, y)))
        border_pixels.append(img.getpixel((1, y)))
        border_pixels.append(img.getpixel((w-1, y)))
        border_pixels.append(img.getpixel((w-2, y)))
        
    bg_r = sum(p[0] for p in border_pixels) / len(border_pixels)
    bg_g = sum(p[1] for p in border_pixels) / len(border_pixels)
    bg_b = sum(p[2] for p in border_pixels) / len(border_pixels)
    print(f"Processing {os.path.basename(src_path)}: detected bg=({bg_r:.1f}, {bg_g:.1f}, {bg_b:.1f})")
    
    pixels = img.load()
    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    out_pixels = out.load()
    
    for y in range(h):
        for x in range(w):
            r, g, b = pixels[x, y]
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            if dist <= thresh_low:
                out_pixels[x, y] = (0, 0, 0, 0)
            elif dist >= thresh_high:
                out_pixels[x, y] = (r, g, b, 255)
            else:
                a = (dist - thresh_low) / (thresh_high - thresh_low)
                # Un-matte to eliminate light halo around edges
                ur = max(0, min(255, int((r - bg_r * (1.0 - a)) / max(a, 0.01))))
                ug = max(0, min(255, int((g - bg_g * (1.0 - a)) / max(a, 0.01))))
                ub = max(0, min(255, int((b - bg_b * (1.0 - a)) / max(a, 0.01))))
                out_pixels[x, y] = (ur, ug, ub, int(a * 255))
                
    # Auto-crop transparent boundaries for tight logos
    bbox = out.getbbox()
    if bbox:
        # Add 15px padding
        pad = 20
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad)
        )
        out_cropped = out.crop(crop_box)
    else:
        out_cropped = out
        
    out_cropped.save(dest_path, 'PNG', optimize=True)
    print(f"  -> Saved transparent cropped PNG: {dest_path} (size: {out_cropped.size})")

for item in logos_to_process:
    dest_asset = os.path.join(ASSETS_DIR, item["dest_name"])
    dest_artifact = os.path.join(ARTIFACT_DIR, item["dest_name"])
    
    make_transparent(item["src"], dest_asset, item["thresh_low"], item["thresh_high"])
    
    # Also save in artifact directory for display
    if os.path.exists(dest_asset):
        with open(dest_asset, "rb") as rf, open(dest_artifact, "wb") as wf:
            wf.write(rf.read())

print("\nAll transparent logos created and synchronized successfully!")
