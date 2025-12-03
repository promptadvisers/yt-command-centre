import os
from datetime import datetime
from google import genai
from google.genai import types
from PIL import Image
import base64

# Setup - API key from .env file
from dotenv import load_dotenv
load_dotenv()
# Requires GOOGLE_API_KEY in .env file
client = genai.Client()

# Create date-based output folder
date_folder = datetime.now().strftime("%Y-%m-%d")
output_dir = f"outputs/thumbnails/{date_folder}"
os.makedirs(output_dir, exist_ok=True)

# Base path
base_path = "/Users/marwankashef/Desktop/YouTube/YT Command Centre"

# Load assets
presenter_pointing = Image.open(f"{base_path}/images of me/pointing_right_both_hands_shocked.png")
presenter_shhh = Image.open(f"{base_path}/images of me/shhh_finger_lips.png")
presenter_shocked = Image.open(f"{base_path}/images of me/speaking_shocked.png")
logo_image = Image.open(f"{base_path}/logos/images.png")

# Video topic: Claude Code Document Skills (PowerPoint, Excel, Word, PDF)
# Key angles: Unfair advantage, cheat code, document factory

versions = [
    {
        "name": "document_skills_v1",
        "presenter": presenter_pointing,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "Claude Code Document Skills - UNFAIR ADVANTAGE":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the LEFT side, pointing towards the center-right with both hands
- In the CENTER-RIGHT area where the person is pointing, show floating document icons: a PowerPoint slide icon, an Excel spreadsheet icon, a Word document icon, and a PDF icon - all arranged in a dynamic, floating arrangement
- The Claude logo (orange starburst) should be glowing behind/between the document icons
- Add glowing energy effects connecting all elements

STYLE:
- Clean gradient background (deep purple to electric blue) - NO busy patterns
- Document icons should have a glowing, futuristic tech aesthetic with orange/gold energy
- The icons should look like they're being magically generated/created
- High contrast, vibrant colors optimized for small thumbnail display
- Match the lighting on the person to the scene

TEXT:
- Large bold white "UNFAIR ADVANTAGE" with thick black outline, positioned in upper area
- Text should be BIG and impossible to miss

MOOD:
- Exciting, game-changing, powerful
- Clean and uncluttered - KISS principle

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    },
    {
        "name": "document_skills_v2",
        "presenter": presenter_shhh,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "Claude Code Document CHEAT CODE":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the RIGHT side with "shhh" finger to lips gesture (keeping a secret)
- On the LEFT side, show the Claude logo (orange starburst) with document file type icons floating around it (.pptx, .xlsx, .docx, .pdf labels)
- The Claude logo should be large and glowing with orange energy radiating outward
- Add sparkle/magic effects around the documents suggesting instant creation

STYLE:
- Clean gradient background (dark blue to teal) - NO busy patterns
- The Claude logo and documents should glow with warm orange/gold energy
- Mysterious, secretive vibe - like sharing insider knowledge
- High contrast, vibrant colors

TEXT:
- Large bold white "CHEAT CODE" with thick black outline, positioned in upper-left area
- Text should be BIG and readable at small sizes

MOOD:
- Mysterious, insider secret, exclusive knowledge
- Clean and uncluttered - KISS principle

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    },
    {
        "name": "document_skills_v3",
        "presenter": presenter_shocked,
        "prompt": """Create a YouTube thumbnail (16:9 aspect ratio) for "Claude Code Builds EVERYTHING":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the LEFT side with a shocked/amazed expression
- In the CENTER and RIGHT area, show a dramatic arrangement: the Claude logo (orange starburst) large in center with document icons (PowerPoint, Excel, Word, PDF) bursting out from it in all directions
- The documents should look like they're being explosively generated/created from the Claude logo
- Add energy burst effects, light rays, and dynamic motion lines

STYLE:
- Clean gradient background (orange to red/coral, warm tones to match Claude branding) - NO busy patterns
- The Claude logo should be prominently featured with documents radiating outward
- Explosive, dynamic energy - like witnessing something incredible
- High contrast, vibrant warm colors

TEXT:
- Large bold white "BUILDS EVERYTHING" with thick black outline, positioned in upper area
- Text should be BIG and impossible to miss

MOOD:
- Amazement, mind-blown, incredible capability
- Dynamic and energetic but still clean

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames."""
    }
]

print(f"Generating 3 thumbnail versions to: {output_dir}")
print("=" * 50)

for i, version in enumerate(versions, 1):
    print(f"\nGenerating Version {i}: {version['name']}...")

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",  # Nano Banana image gen
            contents=[version["prompt"], version["presenter"], logo_image],
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
            # Print text response if any
            for part in response.candidates[0].content.parts:
                if hasattr(part, "text") and part.text:
                    print(f"  Response: {part.text[:200]}...")

    except Exception as e:
        print(f"  ✗ Error generating {version['name']}: {str(e)}")

print("\n" + "=" * 50)
print(f"Thumbnail generation complete! Check: {output_dir}")
