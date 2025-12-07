import os
from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv

load_dotenv()

client = genai.Client()

# Output directory
output_dir = "/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05"
os.makedirs(output_dir, exist_ok=True)

# Base path
base_path = "/Users/marwankashef/Desktop/YouTube/YT Command Centre"

# Load presenter images (clean cutouts - we'll composite these, not let AI distort them)
presenter_pointing = Image.open(f"{base_path}/images of me/pointing_right_both_hands_shocked.png")
presenter_shocked = Image.open(f"{base_path}/images of me/speaking_shocked.png")
presenter_skeptical = Image.open(f"{base_path}/images of me/portrait_skeptical.png")
logo = Image.open(f"{base_path}/logos/claudecode.png")

# Step 1: Generate HIGH-QUALITY backgrounds (without the person - we'll add them after)
background_prompts = [
    {
        "name": "claude_code_swiss_knife_v1",
        "presenter": presenter_pointing,
        "presenter_position": "left",  # Where to place presenter
        "prompt": """Create a premium YouTube thumbnail background (16:9 aspect ratio) for a tech video about Claude Code's versatility.

CRITICAL: NO person in this image. Leave the LEFT 40% of the frame empty for a person to be added later.

DESIGN DIRECTION (Premium Tech Aesthetic):
- Dark, moody gradient background transitioning from deep navy (#0F172A) on left to rich purple (#4C1D95) on right
- In the CENTER-RIGHT area, create an elegant holographic hub visualization:
  * A central glowing hexagonal core with "CLAUDE" text inside, rendered in warm amber/orange (#F59E0B)
  * 5 floating tool icons arranged in a semicircle around it: scissors (video), image frame, PDF document, audio waveform, sparkle (AI)
  * Each icon should be minimalist, line-art style, glowing with cyan (#06B6D4) or amber accents
  * Subtle connecting lines between icons and the core, like a constellation
- Add depth with:
  * Soft bokeh light orbs in the background
  * Subtle grid pattern fading into the distance (perspective grid)
  * Gentle lens flare from the central core

TEXT:
- Large "BUILDS ANYTHING" in bold white with subtle gradient, positioned in upper-right
- Clean sans-serif font (like Inter or SF Pro), slight 3D depth effect
- NO cheesy outlines - use subtle shadow for depth

STYLE REFERENCE: Think Apple keynote visuals meets Stripe's design aesthetic. Premium, minimal, sophisticated.

IMPORTANT: 16:9 aspect ratio. Edge-to-edge. NO borders. Leave left side empty for person overlay."""
    },
    {
        "name": "claude_code_swiss_knife_v2",
        "presenter": presenter_shocked,
        "presenter_position": "right",
        "prompt": """Create a premium YouTube thumbnail background (16:9 aspect ratio) for a tech video about Claude Code as a Swiss Army knife.

CRITICAL: NO person in this image. Leave the RIGHT 35% of the frame empty for a person to be added later.

DESIGN DIRECTION (Bold Energy):
- Vibrant gradient background: deep coral (#DC2626) transitioning to warm orange (#F97316) to golden yellow (#FBBF24)
- In the CENTER-LEFT area, create a stunning 3D Swiss Army knife visualization:
  * Photorealistic metallic Swiss Army knife, partially open
  * Each blade/tool has a subtle icon: video, image, PDF, audio, AI sparkle
  * The knife handle should have "CLAUDE" engraved in sleek typography
  * Dramatic lighting with rim light effect
  * Subtle reflection beneath the knife
- Add depth with:
  * Soft particle effects (tiny glowing dots) rising from the knife
  * Subtle radial blur vignette at edges
  * Premium product photography feel

TEXT:
- "SWISS ARMY KNIFE" in bold white at TOP, clean modern font
- "FOR DEVELOPERS" smaller below in lighter weight
- Text should have subtle shadow, no cheesy effects

STYLE REFERENCE: Think premium product photography, Apple product shots, high-end advertising.

IMPORTANT: 16:9 aspect ratio. Edge-to-edge. NO borders. Leave right side empty for person overlay."""
    },
    {
        "name": "claude_code_swiss_knife_v3",
        "presenter": presenter_skeptical,
        "presenter_position": "right",
        "prompt": """Create a premium YouTube thumbnail background (16:9 aspect ratio) showing a before/after transformation concept.

CRITICAL: NO person in this image. Leave the RIGHT 35% of the frame empty for a person to be added later.

DESIGN DIRECTION (Transformation/Contrast):
- Split design with clear visual contrast:
  * LEFT 40%: Darker, muted tones (slate gray #475569 to charcoal #1E293B)
    - 5 generic app icons stacked vertically, each with a red X through them
    - Icons should look dated, basic, with red cancellation marks
    - Subtle "noise" texture to make it feel old/outdated
  * CENTER-RIGHT 25%: Vibrant, glowing area
    - Large hexagonal badge with Claude logo, glowing with amber (#F59E0B) energy
    - Electric blue (#3B82F6) and purple (#8B5CF6) energy lines radiating outward
    - Floating particles and light effects
    - This area should feel like "the future"
- Smooth gradient transition between the two halves

TEXT:
- "REPLACED 5 APPS" in bold white at TOP
- Clean modern font with subtle shadow
- The "5" can be slightly larger for emphasis

STYLE REFERENCE: Think before/after tech transformation, premium SaaS marketing visuals.

IMPORTANT: 16:9 aspect ratio. Edge-to-edge. NO borders. Leave right side empty for person overlay."""
    }
]

def composite_presenter(background_path, presenter_img, position, output_path):
    """Composite presenter image onto background."""
    bg = Image.open(background_path).convert("RGBA")
    presenter = presenter_img.convert("RGBA")

    # Target size: 1280x720 (standard YouTube thumbnail)
    bg = bg.resize((1280, 720), Image.LANCZOS)

    # Scale presenter to appropriate size (about 85% of frame height)
    presenter_height = int(720 * 0.9)
    aspect_ratio = presenter.width / presenter.height
    presenter_width = int(presenter_height * aspect_ratio)
    presenter = presenter.resize((presenter_width, presenter_height), Image.LANCZOS)

    # Position presenter
    if position == "left":
        x = -int(presenter_width * 0.15)  # Slight crop on left edge
        y = 720 - presenter_height  # Align to bottom
    else:  # right
        x = 1280 - presenter_width + int(presenter_width * 0.15)  # Slight crop on right edge
        y = 720 - presenter_height  # Align to bottom

    # Paste presenter onto background
    bg.paste(presenter, (x, y), presenter)

    # Save as PNG and JPG
    bg.save(output_path, "PNG")
    bg.convert("RGB").save(output_path.replace(".png", ".jpg"), "JPEG", quality=95)
    print(f"  Composited: {output_path}")

# Generate backgrounds
print("=" * 60)
print("STEP 1: Generating premium backgrounds (without presenter)")
print("=" * 60)

for version in background_prompts:
    print(f"\nGenerating background for {version['name']}...")
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=[version["prompt"], logo],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        image_saved = False
        for part in response.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data is not None:
                img_data = part.inline_data.data
                bg_path = f"{output_dir}/{version['name']}_background.png"
                with open(bg_path, "wb") as f:
                    f.write(img_data)
                print(f"  Background saved: {bg_path}")
                image_saved = True

                # Store path for compositing
                version["bg_path"] = bg_path
                break

        if not image_saved:
            print(f"  No image generated for {version['name']}")
            for part in response.candidates[0].content.parts:
                if hasattr(part, "text") and part.text:
                    print(f"  Response: {part.text[:200]}...")

    except Exception as e:
        print(f"  Error: {e}")

# Composite presenters onto backgrounds
print("\n" + "=" * 60)
print("STEP 2: Compositing presenter images onto backgrounds")
print("=" * 60)

for version in background_prompts:
    if "bg_path" in version:
        print(f"\nCompositing {version['name']}...")
        output_path = f"{output_dir}/{version['name']}.png"
        composite_presenter(
            version["bg_path"],
            version["presenter"],
            version["presenter_position"],
            output_path
        )

print("\n" + "=" * 60)
print("DONE! Thumbnails generated with clean presenter compositing.")
print("=" * 60)
