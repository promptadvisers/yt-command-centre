#!/usr/bin/env python3
"""
YouTube Thumbnail Generator v4
Using Gemini 2.5 Flash Image with proper prompting best practices.

Based on research from:
- https://developers.googleblog.com/en/how-to-prompt-gemini-2-5-flash-image-generation-for-the-best-results/
- https://ai.google.dev/gemini-api/docs/image-generation
- https://blog.google/products/gemini/prompting-tips-nano-banana-pro/

Key principles:
1. Describe scenes narratively, don't list keywords
2. Use photographic language (lens types, lighting setups, camera angles)
3. Be hyperspecific with details
4. Explicitly define reference image roles
5. Use proper aspect ratio and image size config
"""

import os
from google import genai
from google.genai import types
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
from dotenv import load_dotenv
import io

load_dotenv()

client = genai.Client()

# Paths
base_path = "/Users/marwankashef/Desktop/YouTube/YT Command Centre"
output_dir = f"{base_path}/outputs/thumbnails/2025-12-05"
os.makedirs(output_dir, exist_ok=True)

# Load assets
presenter_pointing = Image.open(f"{base_path}/images of me/pointing_right_both_hands_shocked.png")
presenter_shocked = Image.open(f"{base_path}/images of me/speaking_shocked.png")
presenter_skeptical = Image.open(f"{base_path}/images of me/portrait_skeptical.png")
claude_code_logo = Image.open(f"{base_path}/logos/claudecode.png")

def add_professional_text(img, text, position="top-right", font_size=72):
    """Add professional text with shadow effect."""
    draw = ImageDraw.Draw(img)

    try:
        # Try to use a bold system font
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Position
    if position == "top-right":
        x = img.width - text_width - 50
        y = 40
    elif position == "top-center":
        x = (img.width - text_width) // 2
        y = 40
    elif position == "top-left":
        x = 50
        y = 40
    else:
        x, y = position

    # Draw shadow (multiple layers for depth)
    for offset in [4, 3, 2]:
        draw.text((x + offset, y + offset), text, font=font, fill=(0, 0, 0, 180))

    # Draw main text in white
    draw.text((x, y), text, font=font, fill="white")

    return img

def composite_presenter_clean(bg_path, presenter_img, position, scale=0.88):
    """Composite presenter onto background with clean edges."""
    bg = Image.open(bg_path).convert("RGBA")
    presenter = presenter_img.convert("RGBA")

    # Resize background to standard YouTube thumbnail size
    bg = bg.resize((1280, 720), Image.LANCZOS)

    # Scale presenter
    presenter_height = int(720 * scale)
    aspect_ratio = presenter.width / presenter.height
    presenter_width = int(presenter_height * aspect_ratio)
    presenter = presenter.resize((presenter_width, presenter_height), Image.LANCZOS)

    # Position
    if position == "left":
        x = -int(presenter_width * 0.05)
        y = 720 - presenter_height
    else:  # right
        x = 1280 - presenter_width + int(presenter_width * 0.05)
        y = 720 - presenter_height

    # Slight edge softening for better blend
    alpha = presenter.split()[3]
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.5))
    presenter.putalpha(alpha)

    # Composite
    bg.paste(presenter, (x, y), presenter)

    return bg

def composite_logo(img, logo_img, position, size=150):
    """Add logo to image at specified position."""
    logo = logo_img.convert("RGBA")

    # Resize logo
    aspect = logo.width / logo.height
    logo = logo.resize((int(size * aspect), size), Image.LANCZOS)

    if position == "center":
        x = (img.width - logo.width) // 2
        y = (img.height - logo.height) // 2
    elif position == "bottom-right":
        x = img.width - logo.width - 40
        y = img.height - logo.height - 40
    elif position == "center-right":
        x = img.width - logo.width - 200
        y = (img.height - logo.height) // 2
    else:
        x, y = position

    img.paste(logo, (x, y), logo)
    return img

# Thumbnail configurations with NARRATIVE prompts (not keyword lists)
thumbnails = [
    {
        "name": "claude_code_swiss_knife_v1",
        "presenter": presenter_pointing,
        "presenter_position": "left",
        "text": "BUILDS ANYTHING",
        "text_position": "top-right",
        "prompt": """Create an image: A premium tech-themed YouTube thumbnail background in 16:9 aspect ratio.

The scene depicts a futuristic holographic interface floating in space against a deep gradient background that transitions from dark navy blue on the left to rich purple on the right. In the center-right area of the frame, a glowing hexagonal hub radiates with warm amber and gold light, surrounded by five minimalist line-art icons arranged in a constellation pattern - scissors for video editing, an image frame, a PDF document, an audio waveform, and a sparkle for AI. Thin cyan connection lines link the icons to the central hub, creating a network visualization effect.

The composition leaves the left 40% of the frame empty with a clean gradient, perfect for overlaying a person. Subtle bokeh orbs float in the background, and a faint perspective grid fades into the distance, adding depth. The overall aesthetic is premium and sophisticated, inspired by Apple keynote visuals and Stripe's design language.

Style: Photorealistic 3D render with cinematic lighting. The scene is illuminated by soft rim lighting from behind the hexagonal hub, creating a gentle glow effect. High contrast, vibrant colors optimized for small thumbnail display. No text in the image. No people in the image."""
    },
    {
        "name": "claude_code_swiss_knife_v2",
        "presenter": presenter_shocked,
        "presenter_position": "right",
        "text": "SWISS ARMY KNIFE",
        "text_position": "top-left",
        "prompt": """Create an image: A bold, energetic YouTube thumbnail background in 16:9 aspect ratio featuring a Swiss Army knife as the hero element.

The scene shows a photorealistic red Swiss Army knife, partially opened to display multiple tools, floating against a vibrant gradient background that flows from deep coral red on the left through bright orange to warm golden yellow on the right. The knife is positioned in the center-left of the frame, captured at a slight angle with dramatic three-point studio lighting that creates sharp highlights on the metallic blades and tools. A subtle reflection appears beneath the knife on an invisible surface.

The knife handle features the word "CLAUDE" engraved in sleek, modern typography. Tiny particles of light drift upward from the knife, suggesting energy and capability. The right 35% of the frame remains empty with a clean gradient, suitable for overlaying a person.

Style: Premium product photography aesthetic, similar to Apple product shots. Shot with an 85mm portrait lens at f/2.8, creating a shallow depth of field with the knife in sharp focus. Warm, inviting lighting that feels professional and trustworthy. No text overlays in the image. No people in the image."""
    },
    {
        "name": "claude_code_swiss_knife_v3",
        "presenter": presenter_skeptical,
        "presenter_position": "right",
        "text": "REPLACED 5 APPS",
        "text_position": "top-center",
        "prompt": """Create an image: A transformation-themed YouTube thumbnail background in 16:9 aspect ratio showing a before-and-after concept.

The scene is split into two distinct zones. On the left side (approximately 40% of the frame), five generic app icons are stacked vertically against a muted, desaturated background of slate gray transitioning to charcoal. Each icon has a bold red X mark overlaid on it, indicating they've been replaced or cancelled. This area feels dated and dull, with a subtle noise texture.

In the center of the frame, there's a dramatic transition zone where the dull colors give way to vibrant energy. A large glowing hexagonal badge pulses with warm amber and gold light at its core, with electric blue and purple energy rays radiating outward. Floating particles and lens flare effects surround this central element, creating a sense of power and modernity.

The right side of the frame (35%) shows a clean gradient from purple to blue, left empty for a person overlay. The overall composition tells a visual story of transformation - from outdated apps to a single powerful solution.

Style: Cinematic wide-angle shot with dramatic lighting contrast between the dull left zone and vibrant center. The glowing elements are rendered with realistic light bloom effects. No text in the image. No people in the image."""
    }
]

print("=" * 70)
print("GENERATING PREMIUM YOUTUBE THUMBNAILS")
print("Using Gemini 2.5 Flash Image with narrative prompting")
print("=" * 70)

for thumb in thumbnails:
    print(f"\n{'='*50}")
    print(f"Processing: {thumb['name']}")
    print("=" * 50)

    # Step 1: Generate background
    print("Step 1: Generating background...")
    try:
        # Include the Claude Code logo as reference
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=[
                f"Reference image: This is the Claude Code logo - use its amber/orange color scheme as inspiration for the glowing elements. {thumb['prompt']}",
                claude_code_logo
            ],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        bg_saved = False
        for part in response.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data is not None:
                bg_path = f"{output_dir}/{thumb['name']}_background.png"
                with open(bg_path, "wb") as f:
                    f.write(part.inline_data.data)
                print(f"   Background saved: {bg_path}")
                thumb["bg_path"] = bg_path
                bg_saved = True
                break

        if not bg_saved:
            print("   ERROR: No background image generated")
            for part in response.candidates[0].content.parts:
                if hasattr(part, "text") and part.text:
                    print(f"   Response: {part.text[:300]}...")
            continue

    except Exception as e:
        print(f"   ERROR: {e}")
        continue

    # Step 2: Composite presenter
    print("Step 2: Compositing presenter image...")
    try:
        final_img = composite_presenter_clean(
            thumb["bg_path"],
            thumb["presenter"],
            thumb["presenter_position"]
        )
        print("   Presenter composited successfully")
    except Exception as e:
        print(f"   ERROR compositing: {e}")
        continue

    # Step 3: Add Claude Code logo to the image
    print("Step 3: Adding Claude Code logo...")
    try:
        # Position logo based on thumbnail concept
        if thumb["name"] == "claude_code_swiss_knife_v1":
            final_img = composite_logo(final_img, claude_code_logo, (750, 280), size=120)
        elif thumb["name"] == "claude_code_swiss_knife_v2":
            final_img = composite_logo(final_img, claude_code_logo, "bottom-right", size=100)
        else:
            final_img = composite_logo(final_img, claude_code_logo, (500, 280), size=120)
        print("   Logo added successfully")
    except Exception as e:
        print(f"   ERROR adding logo: {e}")

    # Step 4: Add text overlay
    print("Step 4: Adding text overlay...")
    try:
        final_img = add_professional_text(
            final_img,
            thumb["text"],
            thumb["text_position"],
            font_size=68
        )
        print("   Text added successfully")
    except Exception as e:
        print(f"   ERROR adding text: {e}")

    # Step 5: Save final images
    print("Step 5: Saving final images...")
    try:
        output_path = f"{output_dir}/{thumb['name']}.png"
        final_img.save(output_path, "PNG")
        final_img.convert("RGB").save(output_path.replace(".png", ".jpg"), "JPEG", quality=95)
        print(f"   Saved: {output_path}")
        print(f"   Saved: {output_path.replace('.png', '.jpg')}")
    except Exception as e:
        print(f"   ERROR saving: {e}")

print("\n" + "=" * 70)
print("THUMBNAIL GENERATION COMPLETE")
print("=" * 70)
