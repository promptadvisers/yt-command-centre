#!/usr/bin/env python3
"""
YouTube Thumbnail Generator v6
With AI-powered feedback loop for quality refinement.

Architecture:
1. Generate initial thumbnail with Nano Banana Pro
2. Critique using Gemini to identify issues
3. Refine by feeding critique back to Nano Banana Pro
4. Repeat up to max_passes or until APPROVED
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


CRITIQUE_PROMPT = """Review this YouTube thumbnail and provide specific, actionable feedback on:

1. COLOR HARMONY: Do colors clash? Is the palette cohesive?
2. LIGHTING MATCH: Does the person's lighting match the scene naturally?
3. TEXT READABILITY: Is text clear and readable at small thumbnail sizes? Good contrast?
4. COMPOSITION: Is there visual balance? Clear focal point? Does the person blend naturally?
5. FACE QUALITY: Any distortion, artifacts, or unnatural features on the person?
6. LOGO VISIBILITY: Is the Claude Code logo (pixel-art orange text) clear and properly placed?
7. EDGE BLENDING: Any harsh cutout edges or unnatural transitions around the person?
8. OVERALL PROFESSIONAL QUALITY: Would this stand out on YouTube? Is it click-worthy?

For each issue found, describe:
- What's wrong
- Where in the image
- How to fix it

Be critical but constructive. Focus on the most impactful improvements.

If the thumbnail is already high quality with no significant issues, respond with exactly: "APPROVED - no changes needed"
"""


def generate_initial(concept: dict) -> Image.Image:
    """Pass 1: Generate initial thumbnail with Nano Banana Pro."""
    print("   Generating initial thumbnail...")

    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=[
            "Reference image 1 - This is the person to feature (maintain exact likeness):",
            concept["presenter"],
            "Reference image 2 - This is the Claude Code logo to incorporate:",
            claude_code_logo,
            concept["prompt"]
        ],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(
                aspect_ratio="16:9",
                image_size="2K"
            ),
        ),
    )

    image_parts = [part for part in response.parts if getattr(part, "inline_data", None)]
    if image_parts:
        return image_parts[0].as_image()
    else:
        raise RuntimeError("No image generated")


def critique_thumbnail(image_path: str) -> str:
    """Pass 2: Get AI critique of thumbnail quality."""
    print("   Getting AI critique...")

    # Load image fresh from disk for critique
    img = Image.open(image_path)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            img,
            CRITIQUE_PROMPT
        ],
    )

    return response.text


def refine_thumbnail(current_image: Image.Image, critique: str, concept: dict) -> Image.Image:
    """Pass 3: Refine thumbnail based on critique."""
    print("   Refining based on feedback...")

    refinement_prompt = f"""Here is a YouTube thumbnail that needs improvement based on this feedback:

FEEDBACK:
{critique}

Generate an improved version that addresses these specific issues while maintaining:
- The same overall concept and composition
- The exact likeness of the person (use the reference image)
- The Claude Code branding (use the logo reference)
- 16:9 aspect ratio

Original concept: {concept['prompt']}

Focus on fixing the identified issues while keeping what works well."""

    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=[
            "Reference image 1 - Person to feature (maintain exact likeness):",
            concept["presenter"],
            "Reference image 2 - Claude Code logo:",
            claude_code_logo,
            "Current thumbnail to improve:",
            current_image,
            refinement_prompt
        ],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(
                aspect_ratio="16:9",
                image_size="2K"
            ),
        ),
    )

    image_parts = [part for part in response.parts if getattr(part, "inline_data", None)]
    if image_parts:
        return image_parts[0].as_image()
    else:
        raise RuntimeError("No refined image generated")


def save_image(image: Image.Image, path: str):
    """Save image as PNG and JPG."""
    image.save(path)
    from PIL import Image as PILImage
    pil_img = PILImage.open(path)
    pil_img.convert("RGB").save(path.replace(".png", ".jpg"), quality=95)


def run_feedback_loop(concept: dict, max_passes: int = 3) -> str:
    """Run the full feedback loop for a thumbnail concept."""
    name = concept["name"]
    critiques = []

    # Pass 1: Initial generation
    print(f"\n   PASS 1: Initial Generation")
    current_image = generate_initial(concept)
    pass1_path = f"{output_dir}/{name}_pass1.png"
    save_image(current_image, pass1_path)
    print(f"   Saved: {pass1_path}")

    current_path = pass1_path

    for pass_num in range(2, max_passes + 2):
        # Critique current image
        print(f"\n   PASS {pass_num}: Critique")
        critique = critique_thumbnail(current_path)
        critiques.append(f"=== Pass {pass_num} Critique ===\n{critique}")
        print(f"   Critique received ({len(critique)} chars)")

        # Check if approved
        if "APPROVED" in critique.upper() and "NO CHANGES" in critique.upper():
            print(f"   APPROVED! Thumbnail passed quality check.")
            break

        # Print summary of issues
        print(f"   Issues found - refining...")

        # Refine based on critique
        print(f"\n   PASS {pass_num}: Refinement")
        try:
            current_image = refine_thumbnail(current_image, critique, concept)
            current_path = f"{output_dir}/{name}_pass{pass_num}.png"
            save_image(current_image, current_path)
            print(f"   Saved: {current_path}")
        except Exception as e:
            print(f"   Refinement failed: {e}")
            break

    # Save final version
    final_path = f"{output_dir}/{name}_final.png"
    save_image(current_image, final_path)
    print(f"\n   FINAL: {final_path}")

    # Save critique log
    critique_path = f"{output_dir}/{name}_critiques.txt"
    with open(critique_path, "w") as f:
        f.write("\n\n".join(critiques))
    print(f"   Critiques saved: {critique_path}")

    return final_path


# Thumbnail concepts
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


if __name__ == "__main__":
    print("=" * 70)
    print("THUMBNAIL GENERATOR v6 - WITH FEEDBACK LOOP")
    print("=" * 70)

    final_paths = []

    for thumb in thumbnails:
        print(f"\n{'='*60}")
        print(f"PROCESSING: {thumb['name']}")
        print("=" * 60)

        try:
            final_path = run_feedback_loop(thumb, max_passes=2)
            final_paths.append(final_path)
        except Exception as e:
            print(f"   ERROR: {e}")

    print("\n" + "=" * 70)
    print("COMPLETE!")
    print("=" * 70)
    print("\nFinal thumbnails:")
    for path in final_paths:
        print(f"  - {path}")
