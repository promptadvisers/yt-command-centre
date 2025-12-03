import os
from datetime import datetime
from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
client = genai.Client()

# Create date-based output folder
date_folder = datetime.now().strftime("%Y-%m-%d")
output_dir = f"outputs/thumbnails/{date_folder}"
os.makedirs(output_dir, exist_ok=True)

# Base path
base_path = "/Users/marwankashef/Desktop/YouTube/YT Command Centre"

# Load presenter images
presenter_distressed = Image.open(f"{base_path}/images of me/portrait_distressed_suit.png")
presenter_skeptical = Image.open(f"{base_path}/images of me/portrait_skeptical.png")
presenter_shocked = Image.open(f"{base_path}/images of me/speaking_shocked.png")

# Video topic: "2026 is the End of AI" - Warning/contrarian content
# Mood: Ominous, dramatic, pattern interrupt

versions = [
    {
        "name": "end_of_ai_v1",
        "presenter": presenter_distressed,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "2026 is the END of AI":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the RIGHT side with a distressed/worried expression
- In the CENTER-LEFT, show a large glowing "2026" text that looks ominous and cracking/breaking apart
- Add subtle AI-related imagery (neural network lines, circuits) that are fading/dissolving
- The "2026" should dominate the left side of the frame

STYLE:
- Clean gradient background (deep red to dark black) - apocalyptic, warning feel
- The "2026" should glow with an ominous red/orange energy, with cracks forming
- Dramatic, moody lighting with red tones illuminating the person
- High contrast, vibrant but dark colors

TEXT:
- Large bold white "THE END?" with thick black outline, positioned in upper area
- Text should be BIG and impossible to miss
- Add a subtle glow effect to the text

MOOD:
- Warning, ominous, controversial take
- Pattern interrupt - makes viewer stop scrolling
- Clean and uncluttered - KISS principle

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    },
    {
        "name": "end_of_ai_v2",
        "presenter": presenter_skeptical,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "2026: AI is OVER":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the LEFT side with a skeptical/knowing expression
- In the CENTER-RIGHT, show "2026" in large dramatic text
- Behind the text, show an AI brain or robot face that is powering down/shutting off
- Add visual elements suggesting decline (downward arrows, fading lights)

STYLE:
- Clean gradient background (dark purple to black) - mysterious, foreboding
- The "2026" should have a cold blue glow that's flickering/dying
- The AI elements should look like they're losing power
- High contrast, dramatic lighting

TEXT:
- Large bold white "IT'S OVER" with thick red outline, positioned in upper-right area
- Text should be BIG and attention-grabbing

MOOD:
- Contrarian, insider knowledge, "I know something you don't"
- Skeptical but confident
- Clean composition

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    },
    {
        "name": "end_of_ai_v3",
        "presenter": presenter_shocked,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "2026 KILLS AI":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person in CENTER-RIGHT with a shocked/alarmed expression
- In the CENTER-LEFT, show a massive "2026" that looks like it's smashing/destroying an AI symbol
- The AI symbol (brain, robot, neural network) should be shattering or exploding
- Dynamic energy lines showing impact/destruction

STYLE:
- Clean gradient background (orange to deep red) - urgent, alarming
- The destruction should have dramatic orange/red explosion effects
- High energy, dynamic composition
- Match dramatic lighting on the person's face

TEXT:
- Large bold white "GAME OVER" with thick black outline, positioned at TOP
- Text should be MASSIVE and impossible to miss

MOOD:
- Shock, urgency, breaking news feel
- Something huge is happening
- Clean but dynamic

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    }
]

print(f"Generating 3 thumbnail versions to: {output_dir}")
print("=" * 50)

for i, version in enumerate(versions, 1):
    print(f"\nGenerating Version {i}: {version['name']}...")

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=[version["prompt"], version["presenter"]],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        # Extract image from response
        image_saved = False
        for part in response.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data is not None:
                img_data = part.inline_data.data

                # Save as PNG
                png_path = f"{output_dir}/{version['name']}.png"
                with open(png_path, "wb") as f:
                    f.write(img_data)
                print(f"  ✓ Saved: {png_path}")

                # Also save as JPG for smaller file size
                img = Image.open(png_path)
                jpg_path = f"{output_dir}/{version['name']}.jpg"
                img.convert("RGB").save(jpg_path, "JPEG", quality=95)
                print(f"  ✓ Saved: {jpg_path}")

                image_saved = True
                break

        if not image_saved:
            print(f"  ✗ No image generated for {version['name']}")
            for part in response.candidates[0].content.parts:
                if hasattr(part, "text") and part.text:
                    print(f"  Response: {part.text[:200]}...")

    except Exception as e:
        print(f"  ✗ Error generating {version['name']}: {str(e)}")

print("\n" + "=" * 50)
print(f"Thumbnail generation complete! Check: {output_dir}")
