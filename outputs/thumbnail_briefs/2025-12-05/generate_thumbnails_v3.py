import os
from google import genai
from google.genai import types
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from dotenv import load_dotenv

load_dotenv()

client = genai.Client()

# Output directory
output_dir = "/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05"
os.makedirs(output_dir, exist_ok=True)

# Base path
base_path = "/Users/marwankashef/Desktop/YouTube/YT Command Centre"

# Load presenter images
presenter_pointing = Image.open(f"{base_path}/images of me/pointing_right_both_hands_shocked.png")
presenter_shocked = Image.open(f"{base_path}/images of me/speaking_shocked.png")
presenter_skeptical = Image.open(f"{base_path}/images of me/portrait_skeptical.png")
logo = Image.open(f"{base_path}/logos/claudecode.png")

def add_text_overlay(img, text, position="top-right", font_size=72, color="white"):
    """Add professional text overlay to image."""
    draw = ImageDraw.Draw(img)

    # Try to use a system font, fallback to default
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        font = ImageFont.load_default()

    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Position text
    if position == "top-right":
        x = img.width - text_width - 40
        y = 40
    elif position == "top-center":
        x = (img.width - text_width) // 2
        y = 30
    elif position == "top-left":
        x = 40
        y = 40
    else:
        x, y = position

    # Draw shadow
    shadow_offset = 3
    draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill="black")

    # Draw main text
    draw.text((x, y), text, font=font, fill=color)

    return img

def composite_presenter_advanced(background_path, presenter_img, position, output_path, edge_blend=True):
    """Composite presenter image onto background with edge blending."""
    bg = Image.open(background_path).convert("RGBA")
    presenter = presenter_img.convert("RGBA")

    # Target size: 1280x720 (standard YouTube thumbnail)
    bg = bg.resize((1280, 720), Image.LANCZOS)

    # Scale presenter to appropriate size
    presenter_height = int(720 * 0.92)
    aspect_ratio = presenter.width / presenter.height
    presenter_width = int(presenter_height * aspect_ratio)
    presenter = presenter.resize((presenter_width, presenter_height), Image.LANCZOS)

    # Position presenter
    if position == "left":
        x = -int(presenter_width * 0.08)
        y = 720 - presenter_height + 10
    else:  # right
        x = 1280 - presenter_width + int(presenter_width * 0.08)
        y = 720 - presenter_height + 10

    # Edge blending: soften the edges of the presenter slightly
    if edge_blend:
        # Create a mask with soft edges
        mask = presenter.split()[3]  # Get alpha channel
        # Apply slight gaussian blur to edges for blending
        mask = mask.filter(ImageFilter.GaussianBlur(1))
        presenter.putalpha(mask)

    # Paste presenter onto background
    bg.paste(presenter, (x, y), presenter)

    # Save
    bg_rgb = bg.convert("RGB")
    bg_rgb.save(output_path.replace(".png", ".jpg"), "JPEG", quality=95)
    bg.save(output_path, "PNG")
    print(f"  Composited: {output_path}")
    return bg

# Background prompts - NO TEXT (we'll add text ourselves for reliability)
background_prompts = [
    {
        "name": "claude_code_swiss_knife_v1",
        "presenter": presenter_pointing,
        "presenter_position": "left",
        "text": "BUILDS ANYTHING",
        "text_position": "top-right",
        "prompt": """Create a premium YouTube thumbnail background (16:9 aspect ratio, 1280x720px) for a tech video.

CRITICAL: NO text in the image. NO person. Leave the LEFT 40% empty.

DESIGN (Premium Dark Tech):
- Background: Deep gradient from dark navy (#0F172A) on left to rich purple (#4C1D95) on right
- CENTER-RIGHT area: Elegant holographic hub visualization
  * Central glowing hexagonal core with amber/orange (#F59E0B) glow
  * 5 minimalist line-art icons in a semicircle: scissors, image frame, PDF, audio wave, sparkle
  * Icons connected by subtle cyan (#06B6D4) constellation lines
  * Soft bokeh orbs in background
  * Subtle perspective grid fading into distance

STYLE: Apple keynote meets Stripe design. Premium, minimal, sophisticated.

NO TEXT. NO PERSON. 16:9. Edge-to-edge. No borders."""
    },
    {
        "name": "claude_code_swiss_knife_v2",
        "presenter": presenter_shocked,
        "presenter_position": "right",
        "text": "SWISS ARMY KNIFE",
        "text_position": "top-left",
        "prompt": """Create a premium YouTube thumbnail background (16:9 aspect ratio, 1280x720px) for a tech video.

CRITICAL: NO text in the image. NO person. Leave the RIGHT 35% empty.

DESIGN (Bold Product Shot):
- Background: Vibrant gradient from coral (#DC2626) to orange (#F97316) to gold (#FBBF24)
- CENTER-LEFT: Stunning 3D Swiss Army knife
  * Photorealistic metallic Swiss Army knife, partially open showing tools
  * Dramatic rim lighting, reflection beneath
  * "CLAUDE" engraved on handle
  * Subtle particle effects rising from knife

STYLE: Premium product photography, Apple product shots, high-end advertising.

NO TEXT. NO PERSON. 16:9. Edge-to-edge. No borders."""
    },
    {
        "name": "claude_code_swiss_knife_v3",
        "presenter": presenter_skeptical,
        "presenter_position": "right",
        "text": "REPLACED 5 APPS",
        "text_position": "top-center",
        "prompt": """Create a premium YouTube thumbnail background (16:9 aspect ratio, 1280x720px) showing transformation.

CRITICAL: NO text in the image. NO person. Leave the RIGHT 35% empty.

DESIGN (Before/After Split):
- LEFT side (40%): Darker muted area
  * 4-5 generic app icons stacked vertically with red X marks through them
  * Slate gray (#475569) to charcoal (#1E293B) gradient
  * Icons look basic, cancelled
- CENTER area: Transition zone with energy
  * Large glowing hexagonal badge
  * Amber (#F59E0B) core with blue (#3B82F6) and purple (#8B5CF6) energy radiating
  * Floating particles and light effects

STYLE: Before/after tech transformation, premium SaaS marketing.

NO TEXT. NO PERSON. 16:9. Edge-to-edge. No borders."""
    }
]

print("=" * 60)
print("STEP 1: Generating premium backgrounds")
print("=" * 60)

for version in background_prompts:
    print(f"\nGenerating {version['name']}...")
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=[version["prompt"], logo],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        for part in response.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data is not None:
                bg_path = f"{output_dir}/{version['name']}_background.png"
                with open(bg_path, "wb") as f:
                    f.write(part.inline_data.data)
                print(f"  Background: {bg_path}")
                version["bg_path"] = bg_path
                break

    except Exception as e:
        print(f"  Error: {e}")

print("\n" + "=" * 60)
print("STEP 2: Compositing & adding text")
print("=" * 60)

for version in background_prompts:
    if "bg_path" in version:
        print(f"\nProcessing {version['name']}...")
        output_path = f"{output_dir}/{version['name']}.png"

        # Composite presenter
        final_img = composite_presenter_advanced(
            version["bg_path"],
            version["presenter"],
            version["presenter_position"],
            output_path
        )

        # Add text overlay
        final_img = add_text_overlay(
            final_img,
            version["text"],
            version["text_position"],
            font_size=64
        )

        # Save with text
        final_img.convert("RGB").save(output_path.replace(".png", ".jpg"), "JPEG", quality=95)
        final_img.save(output_path, "PNG")
        print(f"  Final: {output_path}")

print("\n" + "=" * 60)
print("DONE!")
print("=" * 60)
