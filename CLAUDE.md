# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a YouTube content creation command center for Mark Kashef's AI & Automation channel. It contains:

- **Prompt templates** for generating video descriptions, Gumroad product listings, and other content
- **Frameworks** for title ideation, thumbnail creation, and content strategy
- **Text hooks** - script intros and hooks for various video topics
- **Assets** - presenter images for thumbnails organized by pose/expression

## Directory Structure

### Source Assets & Frameworks
- `text hooks/` - Video script intros/hooks organized by topic (AI tools, Claude Code, n8n, consulting frameworks)
- `thumbnail_briefs/` - Thumbnail creation guides and briefs following the 4 C's framework
- `titles/` - Title ideation frameworks and best-performing title examples
- `youtube_assets/` - Prompt templates for video descriptions and Gumroad listings
- `images of me/` - Presenter cutout images named by pose (e.g., `pointing_left_smiling.png`, `portrait_skeptical.png`)
- `logos/` - Brand logos for use in thumbnails
- `gemini_nano_banana_api/` - Code examples for Google's Gemini image generation API

### Generated Outputs
All generated content goes to `outputs/` with type-based and date-based subfolders:
```
outputs/
├── thumbnails/
│   └── YYYY-MM-DD/
│       ├── video_title_v1.png
│       ├── video_title_v1.jpg
│       ├── video_title_v2.png
│       └── video_title_v3.png
├── titles/
│   └── YYYY-MM-DD/
│       └── title_ideas.md
├── hooks/
│   └── YYYY-MM-DD/
│       └── video_hooks.md
└── venv/  (shared Python environment)
```

**IMPORTANT**: When generating any content (thumbnails, titles, hooks), ALWAYS:
1. Save to the appropriate `outputs/{type}/` folder
2. Create a date-based subfolder (YYYY-MM-DD format)
3. This builds a progressive database of all generated content over time

## Key Content Frameworks

### Title Psychology (from titles/title_ideation_guide.md)
- "Insider Secret" frame: Cheat Code, Unfair Advantage, Hack
- "Pattern Interrupt": Stop, Don't, Contrarian takes
- Extreme Efficiency: Instantly, In Minutes, 10X
- High-Stakes Curiosity: Terrifying, Changes Everything

### Thumbnail Principles (from thumbnail_briefs/)
- IDEAS > DESIGN - good design with bad idea = bad thumbnail
- 4 C's: Composition, Color, Clean Assets, Curiosity
- KISS principle - simplicity wins
- NO black borders - edge-to-edge images only
- Clean gradient backgrounds - no busy patterns
- Use pointing poses to create leading lines to focal point
- Always generate 3 versions for A/B testing

### Video Description Format (from youtube_assets/how-to-write-video-description.md)
Required structure:
1. Community/Gumroad/Booking links (fixed Bitly URLs)
2. Core Video Description section
3. Timestamps in MM:SS format
4. 10-15 SEO hashtags

### Gumroad Description Format (from youtube_assets/how-to-write-gumroad-descriptions.md)
Required structure:
1. Title (2-5 words + emoji)
2. "What You Get" bullet list
3. One-Sentence Summary
4. Always link to Early AI-dopters community: https://www.skool.com/earlyaidopters/about

## Content Style Notes

- Target audience: AI enthusiasts, automation builders, non-technical business users
- Tone: Accessible, practical, avoids jargon where possible
- Title sweet spot: Personal experiments, forward-looking authority, specific technical "cheats"
- Title length: 50-60 characters for optimal visibility

## Environment Setup

### API Keys
The thumbnail generator requires a Google Gemini API key. Store it in a `.env` file at the repo root:

```bash
# Copy the example and add your key
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
```

The `.env` file is gitignored and should NEVER be committed. Get your API key from: https://aistudio.google.com/apikey

### Python Dependencies
```bash
pip install google-genai pillow python-dotenv
```

## Skills Available

- `thumbnail-generator` - Generates 3 YouTube thumbnail versions using Nano Banana API with presenter images and logos
