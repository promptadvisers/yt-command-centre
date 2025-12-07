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

## Psychology Flow (How Viewers Decide to Click)

Before designing, understand the viewer's decision process:

1. **Visual Stun Gun (1-2 seconds)** - Thumbnail catches eye in the scroll through color/face/motion
2. **Title Reading** - Viewer reads title to understand the value promise
3. **Click Decision** - Viewer asks: "Does this thumbnail validate the title's promise?"

Your thumbnail must WIN the visual stun battle, then SUPPORT (not repeat) the title's promise.

## 7 Visual Stun Gun Techniques

Choose 1-2 techniques per thumbnail (max 3 - avoid clutter):

| Technique | How to Use | Best For |
|-----------|------------|----------|
| **Color Contrast** | Vivid colors against gradient background | Every thumbnail (foundation) |
| **Large Face + Emotion** | Big face with expression matching video promise | Reaction/reveal content |
| **Big Numbers/Dollar Signs** | Large "$10,000" or "10X" creates immediate scale | Results/income content |
| **Red Arrows/Circles** | Point attention to specific element | Tutorial/feature reveals |
| **Optical Illusions** | Unexpected visual that demands second look | Creative/innovative content |
| **Aesthetic Imagery** | Cinematic, symmetrical, beautiful composition | Premium/authority content |
| **Design Collage** | Multiple elements arranged around subject | Comparison/overview content |

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

## Pose Selection Guide (with Emotion-to-Promise Mapping)

The expression on Mark's face subconsciously signals the video's emotional payoff to viewers.

| Video Tone | Recommended Pose | Position | Emotional Promise | Desire Loop |
|------------|------------------|----------|-------------------|-------------|
| Exciting/New Feature | `pointing_right_both_hands_shocked.png` | Left side, pointing right | "Something amazing happened!" | Status (be first to know) |
| Tutorial/How-To | `pointing_right_smiling.png` | Left side, pointing right | "This is good news, easy to follow" | Time (save effort) |
| Warning/Contrarian | `portrait_skeptical.png` | Right side | "I'll tell you the truth" | Status (avoid mistakes) |
| Secret/Insider | `shhh_finger_lips.png` | Center or right | "I have insider knowledge" | Status (exclusive info) |
| Shocking Reveal | `pointing_right_both_hands_shocked.png` | Left side, pointing right | "Mind-blowing discovery" | Status (be ahead) |
| Results/Income | `portrait_smiling.png` | Right side | "I achieved something big" | Money (you can too) |
| Distressed/Cautionary | `portrait_distressed_suit.png` | Right side | "Something went wrong" | Money/Time (avoid loss) |

**Desire Loop Reference** (4 Horsemen):
- **Money**: Income, savings, passive revenue
- **Time**: Efficiency, automation, free time
- **Health**: Reduced stress, work-life balance
- **Status**: Being ahead, expertise, recognition

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

## Prompt Template (Enhanced with Psychology)

Before writing the prompt, answer these questions:
1. **Desire Loop**: Which of the 4 Horsemen does this video target? (Money/Time/Health/Status)
2. **Visual Stun Technique**: Which 1-2 techniques will catch the eye? (Color Contrast, Large Face, Big Numbers, etc.)
3. **Emotional Promise**: What expression on Mark's face matches the video's payoff?

```
Create a YouTube thumbnail (16:9 aspect ratio) for "[VIDEO TITLE]":

CRITICAL: NO black borders. Image must go edge-to-edge, filling the entire frame.

PSYCHOLOGY:
- Desire Loop Target: [Money/Time/Health/Status]
- Visual Stun Technique: [Color Contrast / Large Face + Emotion / Big Numbers / Red Arrow / etc.]
- Emotional Promise: [Excitement/Warning/Secret/Success]

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

## 3-Version Strategy (Test IDEAS, Not Just Layouts)

Don't just test position variations - test distinct CONCEPTS. Each version should test a different idea:

### Version 1: Safe Concept
- Proven format, clear value proposition
- Person pointing at focal element (standard layout)
- Most common, lowest risk

### Version 2: Emotion/Reaction Concept
- Strong facial expression as the primary hook
- Different pose (shocked, skeptical, excited)
- Tests whether emotion beats composition

### Version 3: Contrast/Leverage Concept
- Before/after, transformation, or comparison
- OR leverage recognizable brand/figure
- Tests a completely different psychological hook

**Why This Matters**: Testing 3 similar layouts gives you layout data. Testing 3 distinct ideas tells you which CONCEPT resonates with your audience.

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
