import os
from datetime import datetime
from google import genai
from google.genai import types
from PIL import Image

# Configure API key from .env file
from dotenv import load_dotenv
load_dotenv()
# Requires GOOGLE_API_KEY in .env file

client = genai.Client()

# Create date-based output folder
date_folder = datetime.now().strftime("%Y-%m-%d")
output_dir = os.path.join(os.path.dirname(__file__), date_folder)
os.makedirs(output_dir, exist_ok=True)
print(f"Output folder: {output_dir}")

# Base path for assets (relative to repo root)
repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))

# Load Claude logo
logo_path = os.path.join(repo_root, "logos/images.png")
logo_image = Image.open(logo_path)

# 3-Version Strategy for A/B Testing
versions = [
    {
        "name": "claude5_v1_left_pointing",
        "presenter": os.path.join(repo_root, "images of me/pointing_right_both_hands_shocked.png"),
        "prompt": """
Create a YouTube thumbnail (16:9 aspect ratio) for "Claude 5 is INSANE":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the LEFT side, pointing towards the center-right (use their pointing gesture as a leading line)
- Place the LOGO (orange/coral starburst icon) in the CENTER-RIGHT where the person is pointing
- Add a large glowing "5" next to or integrated with the logo
- The person's pointing gesture should direct the viewer's eye to the logo

STYLE:
- Clean, simple gradient background (deep purple to blue) - NO busy circuit patterns
- The logo should glow with orange/gold energy radiating outward
- Dramatic but clean lighting
- High contrast, vibrant colors optimized for small thumbnail display
- Match the lighting on the person to the scene (dramatic side lighting)

TEXT:
- Large bold white "INSANE" text with thick black outline, positioned in upper area
- Text should be BIG and impossible to miss

MOOD:
- Maximum excitement and energy
- Clean and uncluttered - KISS principle
- Professional but eye-catching

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames.
"""
    },
    {
        "name": "claude5_v2_right_pointing",
        "presenter": os.path.join(repo_root, "images of me/pointing_left_smiling.png"),
        "prompt": """
Create a YouTube thumbnail (16:9 aspect ratio) for "Claude 5 is INSANE":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the RIGHT side, pointing towards the center-left (use their pointing gesture as a leading line)
- Place the LOGO (orange/coral starburst icon) in the CENTER-LEFT where the person is pointing
- Add a large glowing "5" next to or integrated with the logo
- The person's pointing gesture should direct the viewer's eye to the logo

STYLE:
- Clean, simple gradient background (dark blue to cyan) - NO busy circuit patterns
- The logo should glow with orange/gold energy radiating outward
- Dramatic but clean lighting
- High contrast, vibrant colors optimized for small thumbnail display

TEXT:
- Large bold white "INSANE" text with thick black outline, positioned in upper-left area
- Text should be BIG and impossible to miss

MOOD:
- Exciting and energetic
- Clean and uncluttered - KISS principle

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames.
"""
    },
    {
        "name": "claude5_v3_shocked_centered",
        "presenter": os.path.join(repo_root, "images of me/speaking_shocked.png"),
        "prompt": """
Create a YouTube thumbnail (16:9 aspect ratio) for "Claude 5 is INSANE":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person CENTER-RIGHT with a shocked/amazed expression
- Place the LOGO (orange/coral starburst icon) LARGE in the CENTER-LEFT, dominating that side
- Add a massive glowing "5" integrated with or behind the logo
- The logo should be huge and powerful looking

STYLE:
- Clean, simple gradient background (deep purple to magenta) - NO busy patterns
- The logo should have intense glowing energy, almost like it's powering up
- Dramatic lighting with the logo illuminating the person's face
- High contrast, vibrant colors

TEXT:
- Large bold white "INSANE" text with thick black outline, positioned at the TOP
- Text should be MASSIVE

MOOD:
- Shock and awe at the power of Claude 5
- The logo should feel like it has immense power
- Clean composition

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames.
"""
    }
]

print(f"Generating {len(versions)} thumbnail versions...")

for i, version in enumerate(versions, 1):
    print(f"\n[{i}/{len(versions)}] Generating {version['name']}...")

    # Load presenter image for this version
    presenter_image = Image.open(version["presenter"])

    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=[version["prompt"], presenter_image, logo_image],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(
                aspect_ratio="16:9",
                image_size="4K"
            ),
        ),
    )

    # Extract and save the generated thumbnail
    image_parts = [part for part in response.parts if getattr(part, "inline_data", None)]

    if not image_parts:
        print(f"  ERROR: No image returned for {version['name']}")
        continue

    # Save PNG
    img_data = image_parts[0].inline_data
    png_path = os.path.join(output_dir, f"{version['name']}.png")
    with open(png_path, "wb") as f:
        f.write(img_data.data)
    print(f"  Saved: {png_path}")

    # Save JPEG for YouTube
    thumbnail = Image.open(png_path)
    jpg_path = os.path.join(output_dir, f"{version['name']}.jpg")
    thumbnail.convert("RGB").save(jpg_path, quality=95)
    print(f"  Saved: {jpg_path}")

print(f"\n✓ Done! Generated {len(versions)} versions in {output_dir}")
