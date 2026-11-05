#!/usr/bin/env python3
import json
import subprocess
import time
import sys

STORE = "le-velair-w6ickwvy.myshopify.com"

COLLECTIONS_TO_CREATE = [
    {"title": "Fingerprint Jewelry", "handle": "fingerprint-jewelry"},
    {"title": "Engravable Jewelry", "handle": "engravable-jewelry"},
    {"title": "Engravable Chains", "handle": "engravable-chains"},
    {"title": "Engravable Rings", "handle": "engravable-rings"},
    {"title": "Engravable Bracelets", "handle": "engravable-bracelets"},
    {"title": "Engravable Bangles", "handle": "engravable-bangles"},
    {"title": "Engravable Earrings", "handle": "engravable-earrings"},
    {"title": "Keychains", "handle": "keychains"},
    {"title": "Jewellery", "handle": "jewellery"},
    {"title": "Handchains", "handle": "handchains"},
    {"title": "Chains", "handle": "chains"},
    {"title": "Bangles", "handle": "bangles"},
    {"title": "Bracelets", "handle": "bracelets"},
    {"title": "Earrings", "handle": "earrings"},
    {"title": "Earring Sets", "handle": "earring-sets"},
    {"title": "The Ring", "handle": "rings"},
    {"title": "Piercings", "handle": "piercings"},
    {"title": "Belly Piercings", "handle": "belly-piercings"},
    {"title": "Ear Piercings", "handle": "ear-piercings"},
    {"title": "Nose Piercings", "handle": "nose-piercings"},
    {"title": "Gentlemen", "handle": "men"},
    {"title": "Outlet", "handle": "sale"},
    {"title": "Permanent Jewelry", "handle": "permanent-jewelry"},
]

def run_graphql(query, allow_mutations=False):
    cmd = [
        "shopify", "store", "execute",
        "--store", STORE,
        "--query", query,
        "--json"
    ]
    if allow_mutations:
        cmd.append("--allow-mutations")
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error running GraphQL: {res.stderr}", file=sys.stderr)
        return None
    
    # parse the JSON lines output, find the actual json response (starts with '{')
    for line in res.stdout.strip().split("\n"):
        line = line.strip()
        if line.startswith("{") and not line.startswith('{"type":'):
            try:
                # might be multi-line JSON or full block
                idx = res.stdout.find("\n{\n")
                if idx != -1:
                    return json.loads(res.stdout[idx:].strip())
                return json.loads(line)
            except Exception:
                pass
    try:
        # fallback to parsing from first '{' after last '}'
        start = res.stdout.rfind("\n{\n")
        if start != -1:
            return json.loads(res.stdout[start:].strip())
    except Exception as e:
        print(f"Failed to parse output: {e}\nRaw:\n{res.stdout}", file=sys.stderr)
    return None

def get_existing_handles():
    data = run_graphql("query { collections(first: 100) { nodes { id title handle } } }")
    if not data or "collections" not in data:
        print("Could not fetch existing collections.")
        return set()
    handles = {c["handle"] for c in data["collections"]["nodes"]}
    print(f"Found {len(handles)} existing collections in store: {sorted(list(handles))}")
    return handles

def main():
    print(f"Connecting to {STORE}...")
    existing = get_existing_handles()
    
    created_count = 0
    for col in COLLECTIONS_TO_CREATE:
        handle = col["handle"]
        title = col["title"]
        if handle in existing:
            print(f"[EXISTS] {title} ({handle})")
            continue
        
        print(f"[CREATING] {title} ({handle})...")
        mutation = f'mutation {{ collectionCreate(input: {{ title: "{title}", handle: "{handle}" }}) {{ collection {{ id title handle }} userErrors {{ field message }} }} }}'
        res = run_graphql(mutation, allow_mutations=True)
        if res and "collectionCreate" in res:
            errs = res["collectionCreate"].get("userErrors", [])
            if errs:
                print(f"  [WARN] Errors: {errs}")
            else:
                c = res["collectionCreate"]["collection"]
                print(f"  [SUCCESS] Created {c['title']} ({c['handle']}) - ID: {c['id']}")
                created_count += 1
        else:
            print(f"  [ERROR] Failed to create {title}")
        time.sleep(0.3)
        
    print(f"\nDone! Successfully created {created_count} collections.")

if __name__ == "__main__":
    main()
