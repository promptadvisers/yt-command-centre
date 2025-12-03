---
name: thumbnail-generator
description: Generate YouTube thumbnails using Nano Banana (Gemini) API with Mark's presenter images and logos. Use when asked to create thumbnails, generate thumbnail concepts, or make YouTube thumbnail mockups. Always generates 3 versions for A/B testing.
---

# YouTube Thumbnail Generator

Generate 16:9 YouTube thumbnails using Nano Banana (Gemini 3 Pro Image) API, incorporating Mark's presenter cutout images and logos based on thumbnail best practices.

**ALWAYS generate 3 versions** for A/B testing with different compositions/poses.

## Critical Rules (Non-Negotiable)

1. **NO BLACK BORDERS** - Image must go edge-to-edge, filling entire 16:9 frame
2. **CLEAN BACKGROUNDS** - Simple gradients, NO busy circuit patterns or clutter
3. **LEADING LINES** - Use pointing poses to direct viewer's eye to focal point
4. **BIG TEXT** - Text must be huge, readable at small sizes, thick black outline
5. **KISS PRINCIPLE** - Simplicity wins. When in doubt, remove elements.
6. **3 VERSIONS** - Always generate 3 variations for A/B testing

## Thumbnail Best Practices (The 4 C's)

### 1. Composition
- Person on one side POINTING at the focal element (creates leading line)
- Focal element (logo, product, text) where the pointing gesture leads
- Text in upper area, large and impossible to miss
- Edge-to-edge, no wasted space

### 2. Color
- Clean gradient backgrounds (purple-to-blue, orange-to-red, etc.)
- High contrast between subject and background
- Color psychology: Red = Danger/Urgency, Blue = Intelligence/Calm, Orange = Energy/Excitement
- Match lighting on person to scene lighting

### 3. Clean Assets
- High-quality presenter images with transparent backgrounds
- Logos should glow with energy effects
- No cluttered backgrounds - gradient or simple abstract only

### 4. Curiosity
Create a "Curiosity Gap" using one of:
- **Shock Factor**: Pointing at something unexpected
- **Scale**: Making something look huge/powerful
- **Energy**: Glowing effects, power radiating from subject

## Output Organization

All outputs go to `outputs/` with type-based and date-based subfolders:
```
outputs/
├── thumbnails/
│   └── 2025-12-02/
│       ├── video_title_v1.png
│       ├── video_title_v1.jpg
│       ├── video_title_v2.png
│       ├── video_title_v2.jpg
│       ├── video_title_v3.png
│       └── video_title_v3.jpg
├── titles/
│   └── 2025-12-02/
│       └── title_ideas.md
├── hooks/
│   └── 2025-12-02/
│       └── video_hooks.md
└── venv/  (shared Python environment)
```

This structure builds a progressive database of all generated content over time.

## Available Presenter Images

Located in `images of me/` - choose based on emotional tone:

### Best for Thumbnails (Creates Leading Lines)
- `pointing_right_both_hands_shocked.png` - **TOP PICK** for exciting reveals
- `pointing_left_smiling.png` - Happy, pointing left
- `pointing_right_smiling.png` - Happy, pointing right
- `pointing_up_right_smiling.png` - Pointing up-right

### Portraits (for reaction focus)
- `portrait_smiling.png` - Positive/excited
- `portrait_skeptical.png` - Doubt/contrarian takes
- `portrait_distressed_suit.png` - Warning content
- `portrait_glasses_serious.png` - Professional/analytical

### Special Expressions
- `shhh_finger_lips.png` - Secrets/insider knowledge
- `speaking_shocked.png` - Surprise/revelation
- `thinking_chin_skeptical.png` - Skeptical thinking

## Available Logos

Located in `logos/`:
- `images.png` - Claude/Anthropic orange starburst logo

## Pose Selection Guide

| Video Tone | Recommended Pose | Position |
|------------|------------------|----------|
| Exciting/New Feature | `pointing_right_both_hands_shocked.png` | Left side, pointing right |
| Tutorial/How-To | `pointing_right_smiling.png` | Left side, pointing right |
| Warning/Contrarian | `portrait_skeptical.png` | Right side |
| Secret/Insider | `shhh_finger_lips.png` | Center or right |
| Shocking Reveal | `pointing_right_both_hands_shocked.png` | Left side, pointing right |

## Nano Banana API - Production Code

```python
import os
from datetime import datetime
from google import genai
from google.genai import types
from PIL import Image

os.environ["GOOGLE_API_KEY"] = "YOUR_API_KEY"
client = genai.Client()

# Create date-based output folder
date_folder = datetime.now().strftime("%Y-%m-%d")
output_dir = f"outputs/thumbnails/{date_folder}"
os.makedirs(output_dir, exist_ok=True)

# Load assets
presenter_image = Image.open("images of me/pointing_right_both_hands_shocked.png")
logo_image = Image.open("logos/images.png")  # If using a logo

# Generate 3 versions with different prompts
versions = [
    {"name": "v1_pointing_left", "prompt": "...person on LEFT pointing right..."},
    {"name": "v2_pointing_right", "prompt": "...person on RIGHT pointing left..."},
    {"name": "v3_centered", "prompt": "...person centered, logo above..."},
]

for version in versions:
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

    image_parts = [p for p in response.parts if getattr(p, "inline_data", None)]
    if image_parts:
        img_data = image_parts[0].inline_data
        with open(f"{output_dir}/{version['name']}.png", "wb") as f:
            f.write(img_data.data)
```

## Prompt Template (Proven to Work)

```
Create a YouTube thumbnail (16:9 aspect ratio) for "[VIDEO TITLE]":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the [LEFT/RIGHT] side, pointing towards the [center-right/center-left]
- Use their pointing gesture as a leading line to the focal point
- Place the LOGO/PRODUCT in the [CENTER-RIGHT/CENTER-LEFT] where the person is pointing
- Add [glowing effects/energy/text] around the focal element

STYLE:
- Clean, simple gradient background ([color1] to [color2]) - NO busy patterns
- The focal element should glow with [color] energy radiating outward
- Dramatic but clean lighting
- High contrast, vibrant colors optimized for small thumbnail display
- Match the lighting on the person to the scene

TEXT:
- Large bold white "[TEXT]" with thick black outline, positioned in upper area
- Text should be BIG and impossible to miss

MOOD:
- [Exciting/Warning/Mysterious/Professional]
- Clean and uncluttered - KISS principle

IMPORTANT: Fill the entire 16:9 frame edge-to-edge. No borders, no padding, no frames.
```

## 3-Version Strategy

When generating thumbnails, create these 3 variations:

### Version 1: Standard (Person Left, Pointing Right)
- Person on left side pointing at focal element on right
- Text in upper-left or upper-center
- Most common, proven layout

### Version 2: Reversed (Person Right, Pointing Left)
- Person on right side pointing at focal element on left
- Text in upper-right or upper-center
- Good for A/B testing against V1

### Version 3: Alternative Pose/Composition
- Try a different pose (e.g., shocked face instead of pointing)
- Or different composition (centered, dramatic zoom)
- Tests a completely different approach

## Example: "Claude 5 is INSANE"

### Version 1 Prompt:
```
Create a YouTube thumbnail (16:9 aspect ratio) for "Claude 5 is INSANE":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

COMPOSITION:
- Place the person on the LEFT side, pointing towards the center-right
- Place the LOGO (orange/coral starburst icon) in the CENTER-RIGHT where pointing
- Add a large glowing "5" next to the logo

STYLE:
- Clean gradient background (deep purple to blue) - NO busy patterns
- Logo should glow with orange/gold energy radiating outward
- High contrast, vibrant colors

TEXT:
- Large bold white "INSANE" with thick black outline, upper area

IMPORTANT: Fill entire 16:9 frame edge-to-edge. No borders.
```
Pose: `pointing_right_both_hands_shocked.png`

### Version 2 Prompt:
Same but "person on the RIGHT side, pointing left" and logo on CENTER-LEFT

### Version 3 Prompt:
Use `speaking_shocked.png` instead, person centered, logo huge behind them
