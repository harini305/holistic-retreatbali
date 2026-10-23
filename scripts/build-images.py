"""Build web derivatives from the audited originals.

Reads docs/source-audit/original-assets (never modified) and writes resized
WebP copies to public/images, sized to the largest slot each photo fills
(about 2x its on-screen size). Re-run with `npm run images`.
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "source-audit" / "original-assets"
OUT = ROOT / "public" / "images"
APP = ROOT / "app"
MANIFEST = ROOT / "lib" / "images.json"  # read at build time, not served

# name, source path, max width, optional crop box (left, top, right, bottom)
PHOTOS = [
    ("sanur-dawn", "2026/09/sanur-sunset.jpg", 1600, None),
    ("guests-healer", "2026/09/guests-healer.jpg", 1200, None),
    ("temple-purification", "2026/09/temple-purification.jpg", 1152, None),
    ("temple-priest", "2024/03/priest-mengening-temple.jpeg", 1000, None),
    ("villa-pavilion", "2026/09/villa-pavilion.jpg", 1024, None),
    ("villa-garden", "2026/09/villa-garden.jpg", 600, None),
    ("villa-entrance", "2026/09/villa-entrance.jpg", 720, None),
    ("villa-bedroom", "2026/09/bedroom.jpg", 600, None),
    ("villa-courtyard", "2024/11/bali-healing-retreat-center.webp", 1280, None),
    ("food-spread", "2026/09/food-spread.jpg", 640, None),
    ("sound-healing", "2026/09/sound-healing.jpg", 768, None),
    ("table-group", "2026/09/table-group.jpg", 960, None),
    ("beach-group", "2026/09/beach-group.jpg", 1240, None),
    # The 2025 portrait has a "Mitch - Director" label baked into the bottom strip; crop it off.
    ("mitch-portrait", "2025/03/mitch-director-min.jpg", 597, (0, 0, 597, 746)),
]

QUALITY = 72


def save_photo(name, rel, max_w, crop):
    im = Image.open(SRC / rel).convert("RGB")
    if crop:
        im = im.crop(crop)
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    path = OUT / f"{name}.webp"
    im.save(path, "WEBP", quality=QUALITY, method=6)
    return {"src": f"/images/{name}.webp", "width": im.width, "height": im.height}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for name, rel, max_w, crop in PHOTOS:
        manifest[name] = save_photo(name, rel, max_w, crop)

    # Logo: the original lockup, resized for its ~46px display height at up to 3x,
    # saved as lossless WebP so the artwork is not altered.
    logo = Image.open(SRC / "2020/06/logo-800x211-1.png").convert("RGBA")
    logo = logo.resize((480, round(logo.height * 480 / logo.width)), Image.LANCZOS)
    logo.save(OUT / "logo-holistic-retreat-bali.webp", "WEBP", lossless=True, method=6)
    manifest["logo"] = {"src": "/images/logo-holistic-retreat-bali.webp", "width": logo.width, "height": logo.height}

    # Favicons from the square navy logo used on the live site.
    Image.open(SRC / "2020/04/logo1.png").convert("RGBA").save(APP / "icon.png", optimize=True)
    Image.open(SRC / "2020/04/logo2x.png").convert("RGBA").resize((180, 180), Image.LANCZOS).save(APP / "apple-icon.png", optimize=True)

    # 1200x630 social image cropped from the Sanur dawn photograph.
    dawn = Image.open(SRC / "2026/09/sanur-sunset.jpg").convert("RGB")
    scale = 630 / dawn.height
    dawn = dawn.resize((round(dawn.width * scale), 630), Image.LANCZOS)
    left = (dawn.width - 1200) // 2
    dawn.crop((left, 0, left + 1200, 630)).save(APP / "opengraph-image.jpg", quality=82)

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    for k, v in manifest.items():
        size = (ROOT / "public" / v["src"].lstrip("/")).stat().st_size // 1024
        print(f"{k:22} {v['width']}x{v['height']}  {size} KB")


if __name__ == "__main__":
    main()
