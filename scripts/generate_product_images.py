import os
from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

client = genai.Client()

# Base path
base_path = "/Users/marwankashef/Desktop/YouTube/YT Command Centre"

# Load Claude Code logo
claude_code_logo = Image.open(f"{base_path}/logos/claudecode.png")

# Product details for the Claude Code Extraction Kit
product_name = "Claude Code Extraction Kit"

# Square image prompt (1:1)
square_prompt = """Create a clean, professional digital product cover image for a Gumroad product called "Claude Code Extraction Kit".

CRITICAL: This must be a SQUARE (1:1 aspect ratio) image. No borders, edge-to-edge.

Design requirements:
- Modern, tech-forward aesthetic
- Use the Claude Code logo/branding provided in the image
- Dark background (near black or deep charcoal gradient)
- Claude's brand orange color (#E07A4F) as accent color for glows and highlights
- Include visual elements suggesting: code extraction, document processing, AI automation
- Text: "Extraction Kit" in clean, bold sans-serif font - make it prominent
- Subtle code snippets or terminal window elements in the background
- Professional, minimalist style suitable for a Gumroad product thumbnail
- Clean gradient or subtle tech pattern background

The product helps users reverse-engineer Claude AI's document creation capabilities and import official Anthropic skills.

IMPORTANT: SQUARE format. Fill the entire frame edge-to-edge. No borders, no padding."""

# 16:9 image prompt
wide_prompt = """Create a clean, professional digital product banner image for a Gumroad product called "Claude Code Extraction Kit".

CRITICAL: This must be a WIDE (16:9 aspect ratio) image. No borders, edge-to-edge.

Design requirements:
- Modern, tech-forward aesthetic
- Use the Claude Code logo/branding provided in the image - place it on the LEFT side
- Dark background (near black or deep charcoal gradient)
- Claude's brand orange color (#E07A4F) as accent color for glows and highlights
- Include visual elements suggesting: code extraction, document icons (PDF, XLSX, PPTX), AI automation
- Text: "Claude Code Extraction Kit" in clean, bold sans-serif font on the RIGHT side
- Subtitle text below: "Reverse Engineer Any AI Document" in smaller font
- Subtle code snippets or terminal window elements in the background
- Professional, minimalist style suitable for a featured banner
- Clean gradient flowing from left to right

The product helps users reverse-engineer Claude AI's document creation capabilities and import official Anthropic skills.

IMPORTANT: WIDE 16:9 format. Fill the entire frame edge-to-edge. No borders, no padding."""

print("Generating Gumroad product images...")
print("=" * 50)

# Generate square image (1:1)
print("\n1. Generating square (1:1) product image...")
try:
    response_square = client.models.generate_content(
        model="gemini-2.0-flash-exp-image-generation",
        contents=[square_prompt, claude_code_logo],
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
        ),
    )

    # Extract image from response
    image_saved = False
    for part in response_square.candidates[0].content.parts:
        if hasattr(part, "inline_data") and part.inline_data is not None:
            img_data = part.inline_data.data

            # Save as PNG
            png_path = "product_image_square.png"
            with open(png_path, "wb") as f:
                f.write(img_data)
            print(f"  ✓ Saved: {png_path}")
            image_saved = True
            break

    if not image_saved:
        print("  ✗ No square image generated")
        for part in response_square.candidates[0].content.parts:
            if hasattr(part, "text") and part.text:
                print(f"  Response: {part.text[:200]}...")

except Exception as e:
    print(f"  ✗ Error generating square image: {str(e)}")

# Generate 16:9 image
print("\n2. Generating 16:9 product image...")
try:
    response_wide = client.models.generate_content(
        model="gemini-2.0-flash-exp-image-generation",
        contents=[wide_prompt, claude_code_logo],
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
        ),
    )

    # Extract image from response
    image_saved = False
    for part in response_wide.candidates[0].content.parts:
        if hasattr(part, "inline_data") and part.inline_data is not None:
            img_data = part.inline_data.data

            # Save as PNG
            png_path = "product_image_16x9.png"
            with open(png_path, "wb") as f:
                f.write(img_data)
            print(f"  ✓ Saved: {png_path}")
            image_saved = True
            break

    if not image_saved:
        print("  ✗ No 16:9 image generated")
        for part in response_wide.candidates[0].content.parts:
            if hasattr(part, "text") and part.text:
                print(f"  Response: {part.text[:200]}...")

except Exception as e:
    print(f"  ✗ Error generating 16:9 image: {str(e)}")

print("\n" + "=" * 50)
print("Product image generation complete!")
