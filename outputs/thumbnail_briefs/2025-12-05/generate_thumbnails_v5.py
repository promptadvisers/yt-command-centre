#!/usr/bin/env python3
"""
YouTube Thumbnail Generator v5
Using Gemini 3 Pro Image (Nano Banana Pro) - letting the model do the heavy lifting.

Feed it: pose image + logo + concept prompt
Let Gemini handle: composition, lighting, blending, everything
"""

import os
from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv

load_dotenv()

# Set API key directly
os.environ["GOOGLE_API_KEY"] = "AIzaSyD8FHOiB9uoGVyS75Yjrr2ggjVvjdPvWJo"

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

# Thumbnail concepts - Gemini does ALL the work
thumbnails = [
    {
        "name": "claude_code_swiss_knife_v1",
        "presenter": presenter_pointing,
        "prompt": """Create a YouTube thumbnail featuring this exact person in this exact pose.

SCENE: The person is on the left side of the frame, pointing towards a glowing holographic hub on the right. The hub shows the Claude Code logo (the pixel-art text logo provided) at its center, surrounded by 5 floating tool icons: scissors (video), image frame, PDF document, audio waveform, and AI sparkle. Thin glowing lines connect the icons to the center.

BACKGROUND: Deep gradient from dark navy blue to rich purple. Subtle bokeh orbs and a faint perspective grid add depth.

TEXT: Large bold white text "BUILDS ANYTHING" in the upper right area with a subtle shadow.

STYLE: Premium tech aesthetic. Cinematic lighting that matches the person naturally into the scene. The person should look like they belong in this environment, with proper color grading and lighting on their face and body.

CRITICAL: Maintain the person's exact likeness and pose. Do not distort their face or body. Blend them naturally into the scene with matching lighting."""
    },
    {
        "name": "claude_code_swiss_knife_v2",
        "presenter": presenter_shocked,
        "prompt": """Create a YouTube thumbnail featuring this exact person with this exact shocked/excited expression.

SCENE: The person is on the right side of the frame with their hands up in an excited gesture. On the left side is a photorealistic red Swiss Army knife with multiple tools extended. The knife has "CLAUDE" engraved on the handle. The Claude Code logo (pixel-art text provided) appears subtly in the bottom right corner.

BACKGROUND: Vibrant gradient flowing from coral red through orange to golden yellow. Studio lighting creates dramatic highlights on the knife.

TEXT: Large bold white text "SWISS ARMY KNIFE" at the top left, with smaller "FOR DEVELOPERS" below it.

STYLE: Premium product photography aesthetic. The person should be lit to match the warm orange environment. Natural color grading that makes them look like they're actually in this scene.

CRITICAL: Maintain the person's exact likeness and expression. Blend them naturally with matching warm lighting on their face."""
    },
    {
        "name": "claude_code_swiss_knife_v3",
        "presenter": presenter_skeptical,
        "prompt": """Create a YouTube thumbnail featuring this exact person with this exact skeptical/confident expression.

SCENE: The person is on the right side with arms crossed or a confident pose. On the left side, show 5 generic app icons stacked vertically, each with a red X through them (representing cancelled/replaced apps). In the center, a glowing hexagonal badge with the Claude Code logo (pixel-art text provided) radiates energy with blue and purple light rays.

BACKGROUND: Split design - left side is muted gray/charcoal (the "old" side), transitioning to vibrant purple-blue on the right (the "new" side). Energy particles float around the center.

TEXT: Large bold white text "REPLACED 5 APPS" centered at the top.

STYLE: Transformation/before-after aesthetic. The person should be lit with the vibrant colors from the right side of the scene. Natural blending that makes them look present in this environment.

CRITICAL: Maintain the person's exact likeness and skeptical expression. The lighting on their face should reflect the scene's colors naturally."""
    }
]

print("=" * 70)
print("GENERATING THUMBNAILS WITH NANO BANANA PRO")
print("Model: gemini-3-pro-image-preview")
print("=" * 70)

for thumb in thumbnails:
    print(f"\n{'='*50}")
    print(f"Generating: {thumb['name']}")
    print("=" * 50)

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[
                "Reference image 1 - This is the person to feature (maintain exact likeness):",
                thumb["presenter"],
                "Reference image 2 - This is the Claude Code logo to incorporate:",
                claude_code_logo,
                thumb["prompt"]
            ],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE"],
                image_config=types.ImageConfig(
                    aspect_ratio="16:9",
                    image_size="2K"
                ),
            ),
        )

        # Extract and save image
        image_parts = [part for part in response.parts if getattr(part, "inline_data", None)]

        if image_parts:
            img = image_parts[0].as_image()
            output_path = f"{output_dir}/{thumb['name']}.png"
            img.save(output_path)
            # Convert to RGB for JPG (handle both PIL and genai Image types)
            from PIL import Image as PILImage
            pil_img = PILImage.open(output_path)
            pil_img.convert("RGB").save(output_path.replace(".png", ".jpg"), quality=95)
            print(f"   Saved: {output_path}")
            print(f"   Saved: {output_path.replace('.png', '.jpg')}")
        else:
            print("   ERROR: No image returned")
            # Check for text response
            for part in response.parts:
                if hasattr(part, "text") and part.text:
                    print(f"   Response: {part.text[:300]}...")

    except Exception as e:
        print(f"   ERROR: {e}")

print("\n" + "=" * 70)
print("DONE")
print("=" * 70)
