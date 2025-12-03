import os
from google import genai
from google.genai import types
from PIL import Image

# 1) Configure your API key (from Google AI Studio)
# Load from .env file or environment variable
# os.environ["GOOGLE_API_KEY"] = "your-api-key-here"

client = genai.Client()

prompt = "Ultra-detailed cinematic portrait of a cyberpunk samurai in the rain, 4K, moody lighting"

# 2) Call Nano Banana Pro via Gemini 3 Pro Image
response = client.models.generate_content(
    model="gemini-3-pro-image-preview",  # Nano Banana Pro
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(
            aspect_ratio="16:9",    # e.g. "1:1", "4:5", "9:16", "16:9"
            image_size="4K"         # "1K", "2K", or "4K"
        ),
        # Optional: enable tools like google_search for grounded visuals
        # tools=[{"google_search": {}}],
    ),
)

# 3) Extract and save the first returned image
image_parts = [part for part in response.parts if getattr(part, "inline_data", None)]

if not image_parts:
    raise RuntimeError("No image returned from Nano Banana Pro")

img = image_parts[0].as_image()  # returns a PIL.Image.Image
img.save("nano_banana_pro_output.png")
print("Saved nano_banana_pro_output.png")