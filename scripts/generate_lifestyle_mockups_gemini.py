#!/usr/bin/env python3
"""
Automated Lifestyle Mockup Generator using Google Gemini / Imagen 3 API.
Reads prompts from mockup_generation_queue.json, generates images,
and converts them into optimized WebP (<110KB).

Requirements:
    pip install google-genai pillow
    export GEMINI_API_KEY="your-api-key"

Usage:
    python3 scripts/generate_lifestyle_mockups_gemini.py --limit 5
    python3 scripts/generate_lifestyle_mockups_gemini.py --index 1
    python3 scripts/generate_lifestyle_mockups_gemini.py --all
"""

import os
import sys
import json
import time
import argparse
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("Please install google-genai: pip install google-genai")

try:
    from PIL import Image
    import io
except ImportError:
    print("Please install Pillow: pip install pillow")

BASE_DIR = Path(__file__).resolve().parent.parent
QUEUE_FILE = BASE_DIR / "mockup_generation_queue.json"
OUTPUT_DIR = Path.home() / "Downloads" / "Aurelle_All_351_Lifestyle_Mockups"


def main():
    parser = argparse.ArgumentParser(description="Generate lifestyle mockups with Gemini/Imagen 3")
    parser.add_argument("--key", type=str, default="", help="Gemini API Key")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of items")
    parser.add_argument("--index", type=int, default=None, help="Generate a specific item index")
    parser.add_argument("--all", action="store_true", help="Generate all items in queue")
    args = parser.parse_args()

    api_key = args.key or os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        print("\n❌ ERROR: GEMINI_API_KEY is required! Pass --key=... or set export GEMINI_API_KEY=...\n")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        queue = json.load(f)

    if args.index is not None:
        tasks = [item for item in queue if item["index"] == args.index]
    elif args.limit:
        tasks = queue[: args.limit]
    else:
        tasks = queue

    print(f"Loaded {len(queue)} items from queue. Processing {len(tasks)} items...")
    print(f"Output folder: {OUTPUT_DIR}\n")

    client = genai.Client(api_key=api_key)

    for i, item in enumerate(tasks, 1):
        target_webp = OUTPUT_DIR / item["filename"]
        if target_webp.exists():
            print(f"[{i}/{len(tasks)}] ⏭️ Skipping #{item['index']} (Already exists)")
            continue

        print(f"[{i}/{len(tasks)}] 🎨 Generating #{item['index']}: {item['title']}...")
        try:
            result = client.models.generate_images(
                model="imagen-3.0-generate-002",
                prompt=item["prompt"],
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                    output_mime_type="image/jpeg",
                    aspect_ratio="1:1",
                    person_generation="ALLOW_ADULT",
                ),
            )

            if not result.generated_images:
                print("  ❌ No image returned from API")
                continue

            raw_bytes = result.generated_images[0].image.image_bytes
            img = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
            img = img.resize((1024, 1024), Image.LANCZOS)
            img.save(target_webp, "WEBP", quality=82, method=6)

            kb = target_webp.stat().st_size / 1024.0
            print(f"  ✅ Saved: {item['filename']} ({kb:.1f} KB)")
            time.sleep(1.5)

        except Exception as e:
            print(f"  ❌ Error for #{item['index']}: {e}")
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                print("\n⚠️ Quota limit reached. Exiting.")
                break

    print("\n✨ Done!")


if __name__ == "__main__":
    main()
