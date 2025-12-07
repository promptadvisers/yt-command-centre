#!/usr/bin/env python3
"""Generate 3 Semrush One thumbnail variants using Nano Banana Pro."""

import os
import base64
from pathlib import Path
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

BASE_DIR = Path("/Users/marwankashef/Desktop/YouTube/YT Command Centre")
OUTPUT_DIR = BASE_DIR / "outputs/thumbnails/2025-12-05"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def load_image(path):
    """Load image and return as Part for Gemini."""
    with open(path, "rb") as f:
        data = f.read()
    ext = Path(path).suffix.lower().replace(".", "")
    mime = f"image/{ext}" if ext != "jpg" else "image/jpeg"
    return types.Part.from_bytes(data=data, mime_type=mime)

# Load assets
presenter_pointing = load_image(BASE_DIR / "images of me/pointing_right_smiling.png")
presenter_shocked = load_image(BASE_DIR / "images of me/speaking_shocked.png")
presenter_thinking = load_image(BASE_DIR / "images of me/thinking_chin_smiling.png")
semrush_logo = load_image(BASE_DIR / "logos/semrush logo.png")
semrush_icon = load_image(BASE_DIR / "logos/semrush logo icon.png")

thumbnails = [
    {
        "name": "semrush_one_v1_unified_dashboard",
        "presenter": presenter_pointing,
        "logo": semrush_logo,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio.

SCENE: A tech-forward composition showing "unified search tracking" concept.

LEFT SIDE (35%): Place this exact person in this exact pose on the left, pointing toward the right side of the frame. Maintain their exact likeness, facial features, and navy blue suit. The person should be well-lit and blend naturally into the scene.

CENTER-RIGHT (50%): Create a glowing, futuristic hub effect with the Semrush logo at the center. Around it, show small floating icons representing Google (G logo), ChatGPT, Perplexity, and Gemini - as if they're all connected to this central dashboard. Add subtle connecting lines or orbital paths.

BACKGROUND: Rich gradient from deep navy blue (#0A1628) on the left to dark purple (#1A0A2E) on the right. Add subtle tech grid lines or data visualization elements in the background.

TOP AREA: Leave space for bold white text "ONE DASHBOARD" (text will be added later in post-production).

LIGHTING: Dramatic side lighting on the person. The Semrush logo hub should emit a warm orange glow (#FF6B00) that subtly illuminates the scene.

STYLE: Clean, premium, tech-forward. No clutter. Professional YouTube thumbnail aesthetic.

CRITICAL: Maintain the person's exact likeness and pose from the reference image."""
    },
    {
        "name": "semrush_one_v2_ai_visibility_gap",
        "presenter": presenter_shocked,
        "logo": semrush_icon,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio with a "warning/alert" feel.

SCENE: A fear-based composition showing the danger of being "invisible" to AI search.

LEFT SIDE (50%): Create a stylized AI chat interface mockup (like ChatGPT). Show a conversation bubble with text suggesting "I recommend [COMPETITOR]" - implying the viewer's brand is being ignored. Use a red X or crossed-out effect to show "YOU" being invisible/missing.

RIGHT SIDE (40%): Place this exact person with this exact shocked/concerned expression. They should be reacting to seeing this "invisible" status. Maintain their exact likeness, facial features, and navy blue suit. Natural lighting that matches the scene.

BACKGROUND: Dark, ominous gradient from dark red (#2A0A0A) to near-black (#0A0A0A). Creates urgency and warning feel.

BOTTOM RIGHT CORNER: Small Semrush icon as a subtle "solution" hint - like hope in the darkness.

LIGHTING: Dramatic, slightly red-tinted ambient light. The chat interface should glow slightly. Person should have concerned expression lighting.

STYLE: Warning, urgent, fear-inducing but professional. The message is "you're missing out and don't even know it."

CRITICAL: Maintain the person's exact likeness and expression from the reference image."""
    },
    {
        "name": "semrush_one_v3_tracker_reveal",
        "presenter": presenter_thinking,
        "logo": semrush_logo,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio with a clean, premium product reveal feel.

SCENE: A bright, optimistic composition revealing a new tracking capability.

TOP CENTER: Place the Semrush logo prominently at the top, as the hero element.

CENTER: Below the logo, create a simplified, stylized dashboard visualization showing an "AI Visibility" graph with an upward trending line. Use clean, modern data visualization style - not a literal screenshot, but an artistic representation of tracking metrics going up.

LEFT SIDE (30%): Place this exact person in this exact "discovery/thinking" pose. They should look pleased and intrigued, as if they've just discovered something valuable. Maintain their exact likeness, facial features, and navy blue suit.

BACKGROUND: Warm, energetic gradient using Semrush brand colors - from bright orange (#FF6B00) to lighter orange (#FF8C42). Clean and vibrant.

LIGHTING: Bright, optimistic, evenly lit. The person should glow slightly from the warm background. Professional product launch feel.

TEXT AREA: Leave clear space in the center-right for "TRACK AI SEARCH" text (will be added in post).

STYLE: Premium product reveal. Clean, confident, exciting. Like an Apple product announcement but for SEO tools.

CRITICAL: Maintain the person's exact likeness and pose from the reference image."""
    }
]

print("Generating Semrush One thumbnails with Nano Banana Pro...\n")

for thumb in thumbnails:
    print(f"Generating: {thumb['name']}...")

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[
                "Reference image 1 - Person to feature (maintain exact likeness and pose):",
                thumb["presenter"],
                "Reference image 2 - Logo to incorporate:",
                thumb["logo"],
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

        # Save the generated image
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                output_path = OUTPUT_DIR / f"{thumb['name']}.png"
                with open(output_path, "wb") as f:
                    f.write(part.inline_data.data)
                print(f"  Saved: {output_path}")
                break
        else:
            print(f"  WARNING: No image generated for {thumb['name']}")

    except Exception as e:
        print(f"  ERROR generating {thumb['name']}: {e}")

print("\nDone! Thumbnails saved to:", OUTPUT_DIR)
