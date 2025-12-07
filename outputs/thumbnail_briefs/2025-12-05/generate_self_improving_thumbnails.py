#!/usr/bin/env python3
"""Generate 6 Self-Improving Systems thumbnail variants using Nano Banana Pro."""

import os
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
presenter_shocked = load_image(BASE_DIR / "images of me/speaking_shocked.png")
presenter_skeptical = load_image(BASE_DIR / "images of me/portrait_skeptical.png")
presenter_thinking = load_image(BASE_DIR / "images of me/thinking_chin_smiling.png")
presenter_shhh = load_image(BASE_DIR / "images of me/shhh_finger_lips.png")
presenter_pointing = load_image(BASE_DIR / "images of me/pointing_right_smiling.png")
claude_code_logo = load_image(BASE_DIR / "logos/claudecode.png")

thumbnails = [
    {
        "name": "self_improving_v1_infinite_loop",
        "presenter": presenter_shocked,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio with a mind-blowing, awe-inspiring feel.

SCENE: A visual representation of "AI that improves itself" - an infinite loop concept.

LEFT SIDE (35%): Place this exact person with this exact amazed/shocked expression on the left side. Maintain their exact likeness, facial features, and navy blue suit. They should look genuinely amazed at what they're seeing.

CENTER-RIGHT (50%): Create a stunning glowing infinite loop symbol (lemniscate or ouroboros) with the Claude Code logo at its center. The loop should glow with ethereal blue and orange energy, suggesting continuous self-improvement. Add subtle particle effects and light trails following the loop path.

BACKGROUND: Deep space gradient from dark blue (#0A0A1A) to purple (#1A0A2E) with subtle stars or data particles floating.

LIGHTING: The infinite loop emits a soft glow that illuminates the presenter's face. Ethereal, futuristic lighting.

STYLE: Mind-blowing, futuristic, premium tech. This should evoke wonder and awe. Clean composition, no clutter.

CRITICAL: Maintain the person's exact likeness and expression from the reference image."""
    },
    {
        "name": "self_improving_v2_warning",
        "presenter": presenter_skeptical,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio with an ominous, warning feel.

SCENE: A cautionary visual about "AI that improves itself" - slightly scary Skynet vibes.

RIGHT SIDE (35%): Place this exact person with this exact skeptical/concerned expression on the right side. Maintain their exact likeness, facial features, and navy blue suit. They should look like they're warning viewers about something powerful.

LEFT-CENTER (50%): Create a recursive visual of the Claude Code logo - multiple copies getting smaller and spiraling inward, like infinite mirrors reflecting each other. Add a subtle red glow or warning effect around the edges.

BACKGROUND: Ominous dark gradient from dark red (#2A0A0A) to near black (#0A0A0A). Create a sense of warning and power.

LIGHTING: Dramatic red-tinted lighting. The recursive logo effect should have an eerie glow. The presenter should be lit from the side with warning colors.

STYLE: Ominous, powerful, slightly scary but not horror. Think "Skynet is real" vibes but professional.

CRITICAL: Maintain the person's exact likeness and expression from the reference image."""
    },
    {
        "name": "self_improving_v3_automation",
        "presenter": presenter_thinking,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio with a calm, efficient, automation feel.

SCENE: "Set it and forget it" - your system improves automatically while you relax.

LEFT SIDE (35%): Place this exact person with this exact confident/satisfied expression on the left side. Maintain their exact likeness, facial features, and navy blue suit. They should look pleased and confident - like someone who has automated everything.

CENTER-RIGHT (50%): Create a clean visualization of an automatic improvement cycle - circular arrows around the Claude Code logo, with small graphs trending upward. Show the concept of continuous automatic improvement without manual intervention.

BACKGROUND: Calming gradient from deep blue (#0A2E4A) to teal (#0A4A4A). Professional, clean, trustworthy.

LIGHTING: Even, professional lighting. The cycle diagram should glow softly with cyan/teal accents. Clean and modern.

STYLE: Clean, professional, efficient. This should feel like "the smart way to work" - automation that just works.

CRITICAL: Maintain the person's exact likeness and expression from the reference image."""
    },
    {
        "name": "self_improving_v4_insider_secret",
        "presenter": presenter_shhh,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio with an exclusive, secretive feel.

SCENE: "The secret top builders use" - insider knowledge being revealed.

CENTER-LEFT (40%): Place this exact person with this exact "shhh" finger-to-lips pose. Maintain their exact likeness, facial features, and navy blue suit. They should look like they're sharing a secret.

RIGHT SIDE (40%): Create a spotlight effect revealing the Claude Code logo partially - like pulling back a curtain on a secret. The logo should be dramatically lit as if being revealed for the first time.

BACKGROUND: Dark (#0A0A0A) with a dramatic spotlight effect illuminating the reveal area. Create mystery and exclusivity.

LIGHTING: Dramatic spotlight on the logo reveal. The presenter should be partially in shadow, adding to the secretive mood. Gold/amber accent lighting.

STYLE: Exclusive, secretive, high-value. This should feel like you're getting access to something special that most people don't know about.

CRITICAL: Maintain the person's exact likeness and pose from the reference image."""
    },
    {
        "name": "self_improving_v5_evolution",
        "presenter": presenter_pointing,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio with a futuristic, evolutionary feel.

SCENE: "The future of software" - an evolution from basic to self-improving.

LEFT SIDE (35%): Place this exact person with this exact pointing pose on the left, pointing toward the evolution visual on the right. Maintain their exact likeness, facial features, and navy blue suit.

CENTER-RIGHT (55%): Create an evolution chart showing progression from left to right:
- Simple code icon (dim, gray) ->
- AI-assisted icon (brighter) ->
- Self-improving system with Claude Code logo at the peak (brightest, glowing)
Show this as an upward trend/staircase with the Claude Code logo at the highest point, glowing brightly.

BACKGROUND: Gradient from dark (past/left) to bright (future/right). Creates visual flow toward the future.

LIGHTING: Progressive lighting - darker on the left (past), brighter on the right (future). The Claude Code logo should be the brightest element.

STYLE: Futuristic, progressive, aspirational. Viewers should feel they need to evolve to this level.

CRITICAL: Maintain the person's exact likeness and pose from the reference image."""
    },
    {
        "name": "self_improving_v6_blueprint",
        "presenter": presenter_thinking,
        "prompt": """Create a professional YouTube thumbnail in 16:9 aspect ratio with a technical, architectural feel.

SCENE: "The self-improving architecture" - a clean system diagram for builders.

LEFT SIDE (30%): Place this exact person with this exact thoughtful/builder pose on the left side. Maintain their exact likeness, facial features, and navy blue suit. They should look like an architect/builder.

CENTER-RIGHT (60%): Create a clean, technical system diagram showing a circular flow:
- "Database" node -> "Evaluate" node -> "Update Prompt" node -> "Deploy" node -> back to Database
Place the Claude Code logo in the CENTER of this circular flow. Use clean white lines and orange accent colors for key nodes. Make it look like an actual architecture diagram.

BACKGROUND: Dark blue-gray (#1A1A2E) with subtle grid lines - like a blueprint or technical schematic.

LIGHTING: Clean, even lighting. The diagram should be well-lit and easy to read. White lines should pop against the dark background.

STYLE: Technical, professional, blueprint-style. This should appeal to engineers and builders who want implementation details.

CRITICAL: Maintain the person's exact likeness and expression from the reference image."""
    }
]

print("Generating Self-Improving Systems thumbnails with Nano Banana Pro...\n")

for thumb in thumbnails:
    print(f"Generating: {thumb['name']}...")

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[
                "Reference image 1 - Person to feature (maintain exact likeness and pose):",
                thumb["presenter"],
                "Reference image 2 - Logo to incorporate:",
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
