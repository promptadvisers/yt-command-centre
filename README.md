# YouTube Command Centre

A comprehensive content creation hub for AI & Automation YouTube videos. This repository contains prompt templates, frameworks, assets, and AI-powered tools to streamline the entire video production pipeline.

## What This Does

| Asset Type | Input | Output |
|------------|-------|--------|
| **Thumbnails** | Video topic + style | 3 A/B test versions (PNG/JPG) |
| **Titles** | Video concept | Psychology-optimized title options |
| **Hooks** | Topic outline | Engaging script intros |
| **Descriptions** | Video content | SEO-optimized YouTube descriptions |
| **Gumroad Listings** | Product details | Formatted product descriptions |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/yt-command-centre.git
cd yt-command-centre

# Set up environment (for thumbnail generation)
export GOOGLE_API_KEY="your-gemini-api-key"
```

## Repository Structure

```
yt-command-centre/
├── text hooks/           # Video script intros by topic
├── titles/               # Title frameworks & top performers
├── thumbnail_briefs/     # Thumbnail creation guides (4 C's framework)
├── youtube_assets/       # Description & listing templates
├── images of me/         # Presenter cutouts by pose
├── logos/                # Brand logos for thumbnails
├── gemini_nano_banana_api/  # Gemini image generation examples
├── .claude/              # Claude Code skills & commands
│   └── skills/
│       └── thumbnail-generator/
└── outputs/              # All generated content (date-organized)
    ├── thumbnails/
    ├── titles/
    ├── hooks/
    └── gumroad_descriptions/
```

## Core Frameworks

### Title Psychology
From `titles/title_ideation_guide.md`:
- **Insider Secret**: "Cheat Code", "Unfair Advantage", "Hack"
- **Pattern Interrupt**: "Stop Doing X", Contrarian takes
- **Extreme Efficiency**: "Instantly", "In Minutes", "10X"
- **High-Stakes Curiosity**: "Terrifying", "Changes Everything"

### Thumbnail Principles (4 C's)
From `thumbnail_briefs/`:
- **Composition** - Leading lines, rule of thirds
- **Color** - Clean gradients, no busy patterns
- **Clean Assets** - Edge-to-edge, no black borders
- **Curiosity** - Ideas > Design

### Output Organization
All generated content follows this pattern:
```
outputs/{type}/YYYY-MM-DD/{filename}
```
This creates a progressive database of all content over time.

## Using with Claude Code

This repo is optimized for [Claude Code](https://claude.ai/code). The `.claude/` directory contains:

- **Skills**: Reusable capabilities (like `thumbnail-generator`)
- **CLAUDE.md**: Project context and instructions

### Generate Thumbnails
```
> Generate 3 thumbnail versions for "Claude 5 Changes Everything"
```
Claude Code will use the `thumbnail-generator` skill with Gemini's image API.

### Generate Titles
```
> Create title options for a video about MCP servers
```

### Generate Hooks
```
> Write an engaging hook for a Claude Code tutorial
```

## Presenter Images

The `images of me/` folder contains cutout images organized by pose:

| Pose Type | Use Case |
|-----------|----------|
| `pointing_left_*` | Direct attention right |
| `pointing_right_*` | Direct attention left |
| `pointing_up_*` | Highlight text above |
| `portrait_smiling_*` | Friendly, approachable |
| `portrait_shocked_*` | Surprising revelations |
| `thinking_*` | Thought-provoking content |
| `shhh_*` | "Secret" or insider content |

## Content Style

- **Target Audience**: AI enthusiasts, automation builders, non-technical business users
- **Tone**: Accessible, practical, jargon-free where possible
- **Title Length**: 50-60 characters optimal
- **Sweet Spots**: Personal experiments, forward-looking authority, specific technical "cheats"

## Links

- **Community**: [Early AI-dopters on Skool](https://www.skool.com/earlyaidopters/about)
- **YouTube**: Mark Kashef's AI & Automation Channel

---

Built with Claude Code
