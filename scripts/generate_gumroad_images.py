#!/usr/bin/env python3
"""
Generate Gumroad Product Images

Generates square (1:1) and wide (16:9) product images for Gumroad listings
using Google's Gemini image generation API.

Usage:
    python scripts/generate_gumroad_images.py \
        --product-name "My Product Name" \
        --description "Brief description of what the product does" \
        --output-dir "outputs/gumroad/2025-01-01" \
        --logo "logos/claudecode.png"  # optional, defaults to claude.png

The script will generate:
    - product_image_square.png (1:1 aspect ratio)
    - product_image_16x9.png (16:9 aspect ratio)
"""

import argparse
import os
import sys
from pathlib import Path

from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv


def generate_product_images(
    product_name: str,
    description: str,
    output_dir: str,
    logo_path: str = None,
    accent_color: str = "#E07A4F"  # Claude orange by default
):
    """
    Generate square and 16:9 product images for Gumroad.

    Args:
        product_name: Name of the product (used in image text)
        description: Brief description of what the product does
        output_dir: Directory to save the generated images
        logo_path: Path to logo image (optional)
        accent_color: Hex color for accents (default: Claude orange)
    """
    # Load environment variables
    load_dotenv()

    # Initialize client
    client = genai.Client()

    # Base path for the repo
    base_path = Path(__file__).parent.parent

    # Load logo if provided
    logo = None
    if logo_path:
        full_logo_path = base_path / logo_path if not os.path.isabs(logo_path) else Path(logo_path)
        if full_logo_path.exists():
            logo = Image.open(full_logo_path)
            print(f"Using logo: {full_logo_path}")
        else:
            print(f"Warning: Logo not found at {full_logo_path}, proceeding without logo")

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Square image prompt (1:1)
    square_prompt = f"""Create a clean, professional digital product cover image for a Gumroad product called "{product_name}".

CRITICAL: This must be a SQUARE (1:1 aspect ratio) image. No borders, edge-to-edge.

Design requirements:
- Modern, tech-forward aesthetic
{"- Use the logo/branding provided in the image" if logo else "- Include stylized text of the product name"}
- Dark background (near black or deep charcoal gradient)
- Use {accent_color} as accent color for glows and highlights
- Include visual elements relevant to: {description}
- Text: Display the product name prominently in clean, bold sans-serif font
- Subtle tech patterns or code snippets in the background
- Professional, minimalist style suitable for a Gumroad product thumbnail
- Clean gradient or subtle tech pattern background

Product description: {description}

IMPORTANT: SQUARE format. Fill the entire frame edge-to-edge. No borders, no padding."""

    # 16:9 image prompt
    wide_prompt = f"""Create a clean, professional digital product banner image for a Gumroad product called "{product_name}".

CRITICAL: This must be a WIDE (16:9 aspect ratio) image. No borders, edge-to-edge.

Design requirements:
- Modern, tech-forward aesthetic
{"- Use the logo/branding provided in the image - place it on the LEFT side" if logo else "- Include stylized product branding on the LEFT side"}
- Dark background (near black or deep charcoal gradient)
- Use {accent_color} as accent color for glows and highlights
- Include visual elements relevant to: {description}
- Text: "{product_name}" in clean, bold sans-serif font on the RIGHT side
- Add a subtitle describing the product below the title
- Subtle tech patterns or code snippets in the background
- Professional, minimalist style suitable for a featured banner
- Clean gradient flowing from left to right

Product description: {description}

IMPORTANT: WIDE 16:9 format. Fill the entire frame edge-to-edge. No borders, no padding."""

    print("Generating Gumroad product images...")
    print("=" * 50)
    print(f"Product: {product_name}")
    print(f"Output: {output_dir}")
    print("=" * 50)

    # Generate square image (1:1)
    print("\n1. Generating square (1:1) product image...")
    try:
        contents = [square_prompt, logo] if logo else [square_prompt]
        response_square = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=contents,
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        image_saved = False
        for part in response_square.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data is not None:
                img_data = part.inline_data.data
                png_path = os.path.join(output_dir, "product_image_square.png")
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
        contents = [wide_prompt, logo] if logo else [wide_prompt]
        response_wide = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=contents,
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        image_saved = False
        for part in response_wide.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data is not None:
                img_data = part.inline_data.data
                png_path = os.path.join(output_dir, "product_image_16x9.png")
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


def main():
    parser = argparse.ArgumentParser(
        description="Generate Gumroad product images (square and 16:9)"
    )
    parser.add_argument(
        "--product-name", "-n",
        required=True,
        help="Name of the product"
    )
    parser.add_argument(
        "--description", "-d",
        required=True,
        help="Brief description of what the product does"
    )
    parser.add_argument(
        "--output-dir", "-o",
        required=True,
        help="Directory to save the generated images"
    )
    parser.add_argument(
        "--logo", "-l",
        default=None,
        help="Path to logo image (relative to repo root or absolute)"
    )
    parser.add_argument(
        "--accent-color", "-c",
        default="#E07A4F",
        help="Hex color for accents (default: Claude orange #E07A4F)"
    )

    args = parser.parse_args()

    generate_product_images(
        product_name=args.product_name,
        description=args.description,
        output_dir=args.output_dir,
        logo_path=args.logo,
        accent_color=args.accent_color
    )


if __name__ == "__main__":
    main()
