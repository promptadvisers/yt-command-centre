import os
from datetime import datetime
from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv

load_dotenv()

client = genai.Client()

# Output directory
output_dir = "/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05"
os.makedirs(output_dir, exist_ok=True)

# Load assets
presenter_pointing = Image.open("/Users/marwankashef/Desktop/YouTube/YT Command Centre/images of me/pointing_right_both_hands_shocked.png")
presenter_shocked = Image.open("/Users/marwankashef/Desktop/YouTube/YT Command Centre/images of me/speaking_shocked.png")
presenter_skeptical = Image.open("/Users/marwankashef/Desktop/YouTube/YT Command Centre/images of me/portrait_skeptical.png")
logo = Image.open("/Users/marwankashef/Desktop/YouTube/YT Command Centre/logos/claudecode.png")

versions = [
    {
        "name": "claude_code_swiss_knife_v1",
        "presenter": presenter_pointing,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "Claude Code Can Build ANYTHING":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the LEFT side, pointing towards the center-right with both hands
- In the CENTER-RIGHT area where he's pointing, create a visual collage of 5 glowing tool icons arranged in a circle:
  * Video scissors icon (for video splitting)
  * Image/photo icon (for image conversion)
  * PDF document icon (for PDF merging)
  * Audio waveform icon (for audio extraction)
  * AI sparkle/magic icon (for AI image editing)
- Place the Claude Code logo (pixel art style text) in the center of the icon collage, glowing with orange energy
- The icons should radiate outward from the logo with energy lines connecting them

STYLE:
- Clean gradient background from deep purple (#7C3AED) on the left to vibrant blue (#3B82F6) on the right
- NO busy patterns, circuits, or clutter
- The icons and logo should glow with warm orange (#E07A4F) energy radiating outward
- High contrast, vibrant colors optimized for small thumbnail display
- Match the lighting on the person to the purple/blue scene lighting

TEXT:
- Large bold white "BUILDS ANYTHING" with thick black outline, positioned in upper-right area
- Text should be BIG and impossible to miss at small sizes

MOOD:
- Exciting, powerful, versatile
- Clean and uncluttered - KISS principle
- The pointing gesture creates a leading line to the focal point (the tool collage)

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    },
    {
        "name": "claude_code_swiss_knife_v2",
        "presenter": presenter_shocked,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "Claude Code is a Swiss Army Knife":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the RIGHT side with shocked/excited expression
- In the CENTER-LEFT area, create a large stylized Swiss Army knife visual where each blade/tool represents a different capability:
  * One blade with video icon
  * One blade with image icon
  * One blade with PDF icon
  * One blade with audio icon
  * One blade with AI sparkle icon
- The Swiss Army knife should be open with all tools extended, glowing with energy
- Place the Claude Code logo (pixel art style) on the handle of the knife

STYLE:
- Clean gradient background from vibrant orange (#F97316) to deep red (#DC2626)
- NO busy patterns or clutter
- The Swiss knife should have a metallic sheen with orange/gold energy glowing from the blades
- High contrast, vibrant colors
- Dramatic lighting matching the warm orange scene

TEXT:
- Large bold white "SWISS ARMY KNIFE" with thick black outline, positioned in upper area
- Smaller "FOR DEVELOPERS" below it
- Text should be BIG and readable at small sizes

MOOD:
- Energetic, versatile, powerful
- The shocked expression conveys "this tool does EVERYTHING"
- Clean and uncluttered

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    },
    {
        "name": "claude_code_swiss_knife_v3",
        "presenter": presenter_skeptical,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "I Replaced 5 Apps with Claude Code":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- This is a BEFORE/AFTER split concept
- LEFT SIDE (the "before" - greyed out, dull):
  * Show 5 generic app icons stacked vertically, crossed out with red X marks
  * Icons represent: video converter, image converter, PDF tool, audio extractor, photo editor
  * This side should look dull, grey, expensive (maybe show $ symbols)
- RIGHT SIDE (the "after" - vibrant, glowing):
  * The Claude Code logo (pixel art style) large and glowing with orange energy
  * Radiating power lines and energy
  * This side should look vibrant, powerful, FREE
- Place the person on the far RIGHT with skeptical/confident expression (arms crossed or hand on chin)
- The person's expression says "I'll prove it" or "trust me on this"

STYLE:
- Split gradient: LEFT side grey/muted (#6B7280 to #374151), RIGHT side vibrant purple-blue (#7C3AED to #3B82F6)
- Clear visual contrast between the dull "before" and vibrant "after"
- High contrast, the transformation should be immediately obvious

TEXT:
- Large bold white "REPLACED 5 APPS" with thick black outline, positioned in upper area
- Text should be BIG and impossible to miss

MOOD:
- Contrarian, proof-based, transformation
- The skeptical expression invites viewers to watch and see the proof
- Clean split design

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    }
]

for version in versions:
    print(f"Generating {version['name']}...")
    try:
        contents = [version["prompt"], version["presenter"], logo]
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=contents,
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        image_saved = False
        for part in response.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data is not None:
                img_data = part.inline_data.data
                output_path = f"{output_dir}/{version['name']}.png"
                with open(output_path, "wb") as f:
                    f.write(img_data)
                print(f"  Saved: {output_path}")

                # Also save as JPG
                img = Image.open(output_path)
                jpg_path = f"{output_dir}/{version['name']}.jpg"
                img.convert("RGB").save(jpg_path, "JPEG", quality=95)
                print(f"  Saved: {jpg_path}")
                image_saved = True
                break

        if not image_saved:
            print(f"  No image generated for {version['name']}")
            for part in response.candidates[0].content.parts:
                if hasattr(part, "text") and part.text:
                    print(f"  Response: {part.text[:200]}...")

    except Exception as e:
        print(f"  Error generating {version['name']}: {e}")

print("\nDone!")
