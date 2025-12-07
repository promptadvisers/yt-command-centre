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
- `scripts/` - Reusable Python scripts for content generation

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
├── gumroad/
│   └── YYYY-MM-DD/
│       ├── gumroad_listing.md      # Listing copy only (title, description, one-sentence summary)
│       ├── product_image_square.png # 1:1 aspect ratio product image
│       ├── product_image_16x9.png   # 16:9 aspect ratio product image
│       ├── README.md               # Quick start guide for the ZIP
│       └── [asset files].md        # Individual prompt/resource files for the ZIP
├── seo_tags/
│   └── YYYY-MM-DD/
│       └── video_title_seo_tags.md # Comma-separated SEO tags (<500 chars)
├── thumbnail_briefs/
│   └── YYYY-MM-DD/
│       ├── video_title_brief.md    # Working markdown file (optional)
│       ├── video_title_brief.docx  # Polished Word document
│       └── video_title_brief.pdf   # Final PDF for delivery
├── video_splits/                   # Split video files
└── venv/  (shared Python environment)
```

**IMPORTANT**: When generating any content (thumbnails, titles, hooks), ALWAYS:
1. Save to the appropriate `outputs/{type}/` folder
2. Create a date-based subfolder (YYYY-MM-DD format)
3. This builds a progressive database of all generated content over time

## Key Content Frameworks

### Title Psychology (from titles/title_ideation_guide.md)

#### The 4 Psychology Frames
- **"Insider Secret" frame**: Cheat Code, Unfair Advantage, Hack, Secret, Glitch
- **"Pattern Interrupt"**: Stop, Don't, Contrarian takes, Warning
- **Extreme Efficiency**: Instantly, In Minutes, 10X, No Code
- **High-Stakes Curiosity**: Terrifying, Changes Everything, Golden Age

#### Power Word Categories
Use these to punch up bland titles:

| Category | Power Words | Example |
|----------|-------------|---------|
| **Authority** | Secret, Elite, Insider, Pro, Expert | "The SECRET Claude Prompt Engineers Use" |
| **Urgency** | Now, Instantly, Today, Finally, Just | "Finally! Claude Code Can DO THIS" |
| **Exclusivity** | Only, Hidden, Few Know, Nobody Uses | "The HIDDEN Feature Nobody Uses" |
| **Scale** | 10X, Massive, Complete, Ultimate | "10X Your Productivity with THIS" |
| **Emotion** | Terrifying, Insane, Mind-Blowing | "This AI Feature is TERRIFYING" |

#### AI/Automation Niche Power Words
These words perform exceptionally well for Mark's audience:
- "Cheat code", "Game-changer", "10X", "Automation", "No-code", "Instantly"
- "Replace", "Kill", "Secret", "Elite", "One-person company"
- "Battle-tested", "So you don't have to", "Golden age"

#### 5 Title Mistakes to Avoid

1. **Not opening a curiosity loop**
   - Bad: "How to Use Claude Code" (no question in viewer's mind)
   - Good: "Why I STOPPED Using ChatGPT" (viewer asks: what do you use instead?)

2. **Using boring words**
   - Bad: "A Good Way to Automate Tasks"
   - Good: "The CHEAT CODE to Automate EVERYTHING"

3. **Being too wordy** (aim for 50-60 characters)
   - Bad: "How I Learned to Use Artificial Intelligence Tools to Automate My Business"
   - Good: "I Automated My ENTIRE Business (Here's How)"

4. **Not front-loading important words**
   - Bad: "Here's What Happens When You Try Claude's New Feature"
   - Good: "Claude's NEW Feature Changes EVERYTHING"

5. **Not testing/changing underperforming titles**
   - Check CTR + impressions at 24-hour mark
   - If CTR is below 4-5%, consider changing the title
   - YouTube allows title changes - use this strategically

### Thumbnail Principles (from thumbnail_briefs/)

#### The Golden Rule
**IDEAS > DESIGN** - A beautifully designed thumbnail with a bad idea will fail. A rough mockup with a great idea will outperform it every time.

#### The 4 C's Framework
1. **Composition** - Arrangement of elements, leading lines, focal points
2. **Color** - Contrast, color psychology (Red=Danger, Blue=Intelligence, Orange=Energy)
3. **Clean Assets** - High-quality images, no clutter, transparent backgrounds
4. **Curiosity** - Create a question in the viewer's mind they must click to answer

#### Psychology Flow (How Viewers Decide to Click)
Understanding this flow is critical for designing effective thumbnails:

1. **Visual Stun Gun (1-2 seconds)**
   - The viewer's brain processes visual information in ~200ms (bottoms-up processing)
   - Color, motion, brightness, faces - these catch attention BEFORE conscious thought
   - Your thumbnail must WIN this split-second battle against competitors

2. **Title Reading**
   - After the visual stun, viewers shift to the title to understand the value promise
   - Images are interpreted, but words are precise - they need the title for clarity
   - Thumbnail and title must work together, not repeat each other

3. **Click Decision**
   - Viewer asks: "Does this thumbnail validate what the title promises?"
   - If thumbnail supports the title's promise, they click
   - If there's a mismatch, they scroll past

#### 7 Visual Stun Gun Techniques
Use these to catch attention in that critical 1-2 seconds:

| Technique | How It Works | When to Use |
|-----------|--------------|-------------|
| **Color Contrast** | Vivid colors against background, or unique colors vs. competitors | Always - foundation of visual stun |
| **Large Face with Emotion** | Big recognizable face with expression matching video promise | Personal/reaction content |
| **Big Numbers/Dollar Amounts** | Large "$10,000" or "10X" creates immediate scale | Results/income/scale content |
| **Red Arrows/Circles** | Direct attention to focal point | Tutorial/reveal content |
| **Optical Illusions** | Visually compelling graphics that demand a second look | Creative/innovative content |
| **Aesthetic Imagery** | Cinematic, soothing, symmetrical, beautiful | Premium/authority content |
| **Design Collage** | Multiple elements arranged around subject | Comparison/overview content |

#### Emotion-to-Promise Mapping
The expression on your face in the thumbnail subconsciously signals the video's emotional payoff:

| Expression | Promise to Viewer | Best For |
|------------|-------------------|----------|
| Shocked/Excited | "Something amazing happened" | Reveals, new features |
| Skeptical | "I'll tell you the truth" | Reviews, contrarian takes |
| Smiling/Happy | "This is good news" | Tutorials, wins |
| Distressed | "Something went wrong" | Warnings, cautionary tales |
| Finger to lips (Shhh) | "I have insider secrets" | Tips, hidden features |

#### A/B Testing Strategy
Don't just test color variations - test distinct IDEAS:

- **Safe Concept**: Proven format, clear value proposition
- **Emotion Concept**: Strong facial expression, emotional hook
- **Contrast/Progression Concept**: Before/after, transformation
- **Leverage Concept**: Use recognizable figure/brand for instant recognition

#### Core Principles
- **KISS principle** - Simplicity wins, when in doubt remove elements
- **NO black borders** - Edge-to-edge images only
- **Clean gradient backgrounds** - No busy patterns or circuits
- **Leading lines** - Use pointing poses to direct eye to focal point
- **Always generate 3 versions** - For A/B testing distinct concepts

#### High-Performing Thumbnail Examples
Study these patterns from successful tech YouTubers:

**Example 1: "Cursor 2.0 is Here - Anyone Can Code Now!?"** (41K views)
- Dark gradient background (clean, no clutter)
- Product logo/icon prominently displayed in center-left
- Large product name text: "CURSOR 2.0"
- Benefit tagline below: "anyone can code..."
- Person on right pointing AT the product icon
- Minimal elements - just logo, text, person

**Example 2: "How To Use Google AI Studio For Beginners"** (28K views)
- Person on left pointing right toward product
- Product name at top: "Google AI Studio"
- App icon with trophy (achievement/success signal)
- Time promise: "IN 6 MINS" in bold
- Clean composition - person, icon, text only

**Key Patterns to Apply:**
1. **Product/tool icon as hero element** - Make it large and central
2. **Two-line text hierarchy** - Product name (large) + benefit/tagline (smaller)
3. **Person pointing AT the focal point** - Creates visual direction
4. **Dark backgrounds** - Make colors and text pop
5. **Benefit promises** - "anyone can...", "in X mins", "no code"
6. **Minimal elements** - Remove anything that doesn't add value

### Thumbnail Brief Generation
When creating a thumbnail brief, Claude Code should generate polished deliverables for the thumbnail designer using the `docx` skill.

**Output Files:**
- `outputs/thumbnail_briefs/YYYY-MM-DD/[video_slug]_brief.docx` - Word document
- `outputs/thumbnail_briefs/YYYY-MM-DD/[video_slug]_brief.pdf` - Final PDF for delivery
- `outputs/thumbnails/YYYY-MM-DD/[video_slug]_v[1-N].png` - Generated sample thumbnails

**Document Structure (Designer-Focused):**

The brief is for a thumbnail designer - keep it focused on what they need to understand the concept and create variations. NO file paths, NO technical production notes.

**PAGE 1 - Strategy (all on one page, tight spacing):**
1. **Title**: Video name
2. **Video Overview** (compact):
   - What: One sentence describing the video
   - Demos: What's being shown (if applicable)
   - Why it matters: Why this is compelling/novel
3. **Psychological Angles**: List the emotional frames being tested (Awe, Fear, Efficiency, Insider, Future, Technical, etc.)
4. **Recommended Titles**: Top 5 title options (bold, no character counts needed)
5. **A/B Testing Strategy**:
   - Round 1, 2, 3 test order
   - Hypothesis on what will win
6. **Launch Strategy**:
   - Launch title
   - 24hr backup
   - 48hr viral push

**PAGES 2+ - Thumbnail Versions:**
For each version (V1, V2, etc.):
- **Version Name** (e.g., "V1: The Infinite Loop")
- **Psychology**: One-word emotional frame (Awe, Fear, etc.)
- **Concept**: 1-2 sentences describing the visual idea
- **Text**: The text overlay for the thumbnail
- **Colors**: Color palette with hex codes
- **Sample Image**: The generated thumbnail embedded below

**What NOT to include:**
- File paths or asset names (designer doesn't need these)
- Production notes about API models or image generation
- Presenter pose file names
- Logo file names
- Element/Details tables

**Workflow:**
1. Generate thumbnail samples using Nano Banana Pro (`gemini-3-pro-image-preview`)
2. Create the brief using `docx` skill with tight spacing
3. Embed thumbnail samples inline with each version
4. Convert to PDF: `soffice --headless --convert-to pdf [file.docx]`
5. Deliver PDF to designer

### Video Description Format (from youtube_assets/how-to-write-video-description.md)
Required structure:
1. Community/Gumroad/Booking links (fixed Bitly URLs)
2. Core Video Description section
3. Timestamps in MM:SS format
4. 10-15 SEO hashtags

### SEO Tags Format
When generating SEO tags for a video:
- Output to `outputs/seo_tags/YYYY-MM-DD/[video_slug]_seo_tags.md`
- Must be **under 500 characters total**
- Comma-separated terms (no hashtags, just plain keywords)
- Match the specific video topic and title
- Include mix of: primary topic keywords, tool/platform names, audience terms, related concepts
- Format: single line of comma-separated tags for easy copy-paste

Example:
```
Claude AI, Claude Code, AI automation, prompt engineering, document extraction, Excel automation, PowerPoint automation, AI workflow, no code AI, Anthropic, AI tools, AI productivity, AI for business, reverse engineering prompts, AI skills
```

### Gumroad Description Format (from youtube_assets/how-to-write-gumroad-descriptions.md)
Required structure:
1. Title (2-5 words + emoji)
2. "What You Get" bullet list
3. One-Sentence Summary
4. Always link to Early AI-dopters community: https://www.skool.com/earlyaidopters/about

### Gumroad Asset Generation
When creating Gumroad products, Claude Code should automatically generate a complete folder with:
1. **gumroad_description.txt** - Plain text description for pasting into Gumroad (preserves line breaks)
2. **community_footer.txt** - Plain text community promo for post footers (contextual to the product)
3. **Individual asset files** - Each prompt/resource as its own .md file with a title/description header
4. **README.md** - Quick start guide for the ZIP package
5. **product_image_square.png** - 1:1 aspect ratio product image
6. **product_image_16x9.png** - 16:9 aspect ratio product image

**Gumroad Description Format (gumroad_description.txt):**
- Must be a `.txt` file (not .md) to preserve line breaks when pasting into Gumroad
- NO em-dashes (—) anywhere in the text, use regular dashes (-) or rewrite
- Structure:
  - "What You Get" header
  - Each feature as "Feature Name: Description" on its own line with blank line between
  - Community CTA with link
  - "One-Sentence Summary: [summary]"
  - "URL Slug: [product-name-lowercase-with-dashes]" (e.g., "claude-code-extraction-kit")

**Community Footer Format (community_footer.txt):**
- Plain text for copy-paste into social posts, emails, or content footers
- First line: Contextual hook + thematic emoji (e.g., "this is just the tip of the iceberg 🧊")
- List what's inside the Early AI-dopters Community (video walkthroughs, exclusive content, coaching, etc.)
- Always end with: Join here: https://www.skool.com/earlyaidopters/about
- Tone: Enticing but not pushy, highlight the value waiting "behind the curtain"

**Product Image Generation:**
Claude Code should use `scripts/generate_gumroad_images.py` to generate product images. This script:
- Location: `scripts/generate_gumroad_images.py`
- Generates both square (1:1) and wide (16:9) images in one run
- Uses Gemini API (`gemini-2.0-flash-exp-image-generation` model)
- Accepts a logo from `logos/` folder to incorporate into the design
- Default accent color: Claude orange (#E07A4F)

**When creating a Gumroad asset, Claude Code should:**
1. Create the dated output folder: `outputs/gumroad/YYYY-MM-DD/`
2. Write all files (gumroad_description.txt, asset .md files, README.md)
3. Run the image generation script with appropriate parameters:
   - `--product-name`: The product title
   - `--description`: Brief description for visual context
   - `--output-dir`: The dated gumroad folder
   - `--logo`: Relevant logo from `logos/` (e.g., `logos/claudecode.png` for Claude-related products)
4. Verify both images were generated successfully

### Hook Construction Framework

Hooks are the first 5-15 seconds of your video. They determine whether viewers stay or bounce. Use the 6-Word Power Formula to construct hooks that stop the scroll and open curiosity loops.

#### The 6-Word Power Formula
Every powerful hook contains these elements (in order of importance):

1. **Subject Clarity Word** - WHO is doing the action?
   - "I", "You", "We", "They", "This tool", "Claude"
   - Establishes the actor immediately

2. **Action Word** - WHAT did they do?
   - Strong verbs: "automated", "replaced", "discovered", "built", "quit"
   - Avoid weak verbs: "used", "tried", "learned"

3. **Objective/End State Word** - WHAT was the shocking result?
   - The more unexpected, the better
   - "$50,000", "entire business", "in one day", "without code"

4. **Contrast Word** - WHAT's the before/after?
   - Creates tension between expected and actual
   - "but", "instead", "without", "even though"

5. **Proof Word** (optional) - WHY should I believe you?
   - "again", "for the 3rd time", "every single day"
   - Implies you've done this repeatedly

6. **Time Word** (optional) - WHEN/HOW FAST?
   - "in 48 hours", "in 5 minutes", "overnight"
   - Compresses achievement into believable timeframe

#### Hook Formula in Action
**Formula**: Subject + Action + Objective + Contrast + (Proof) + (Time)

**AI/Automation Examples**:
- "I automated my entire business in 48 hours" (Subject + Action + Objective + Time)
- "This AI tool replaced my $5k/month assistant" (Subject + Action + Objective)
- "Why I stopped using ChatGPT - and what I use instead" (Subject + Action + Contrast)
- "I built a $10k/month business with no code - again" (Subject + Action + Objective + Contrast + Proof)

#### Pattern Interrupt Hooks
These work by contradicting what the viewer expects:

| Type | Example | Why It Works |
|------|---------|--------------|
| **Contrarian** | "Stop learning n8n in 2025" | Contradicts conventional wisdom |
| **Warning** | "This AI feature is terrifying" | Triggers fear/curiosity |
| **Confession** | "I was wrong about Claude" | Vulnerability creates trust |
| **Challenge** | "You're using AI wrong" | Implies viewer is missing something |

#### Hook Mistakes to Avoid
- **Burying the hook**: Don't start with "Hey everyone, welcome to my channel..."
- **Being vague**: "I found something interesting" (what? why should I care?)
- **No curiosity loop**: Hook must open a question that the video answers
- **Too long**: First 5 seconds are critical - get to the point

---

### Viewer Psychology & Retention

Understanding why viewers watch (and why they leave) is the foundation of all content strategy. Every decision - from thumbnail to hook to video structure - should be informed by these principles.

#### The 4 Horsemen of Desire
All human motivation maps to these four core desires. Your content must connect to at least one:

| Desire | What Viewers Want | Content Angle |
|--------|-------------------|---------------|
| **Money** | More income, passive revenue, savings | "Make $X with AI", "Save hours = save money" |
| **Time** | More free time, efficiency, automation | "Automate in minutes", "10X faster workflow" |
| **Health** | Physical, mental, reduced stress | "Reduce burnout", "Work smarter not harder" |
| **Status** | Recognition, expertise, being ahead | "Be the AI expert", "Insider knowledge" |

**Mark's primary levers**: Time (automation) and Status (being ahead on AI)

#### The Dopamine Ladder (6 Levels of Engagement)
Viewers climb this ladder as they engage with your content. Each level releases more dopamine and increases commitment:

**Level 1: Stimulation (1-2 seconds)**
- Visual stun gun effect triggers subconscious attention
- Thumbnail catches eye in the scroll
- Brain hasn't made conscious decision yet

**Level 2: Captivation (Hook)**
- Curiosity loop opens - a question forms in viewer's mind
- "What happens next?" or "How did they do that?"
- Brain as problem-solving machine hunts for answers

**Level 3: Anticipation (Building Tension)**
- Viewer guesses the answer to the question
- You give hints that ratchet up anticipation
- Head-fakes and misdirection reset the curiosity loop
- Highest dopamine releases JUST BEFORE the answer

**Level 4: Validation (Payoff)**
- Deliver the answer (must be non-obvious, surprising)
- Resolve the story or provide concrete actionable tip
- Satisfaction locks in - viewer feels smart

**Level 5: Affection (Trust)**
- Viewer likes/trusts YOU, not just the content
- Authenticity, personality, being helpful
- Repeat viewers start forming at this level

**Level 6: Revelation (Loyalty)**
- Viewer realizes you = consistent value source
- See your name/face = dopamine hit without watching
- Educational content reaches this faster than entertainment

#### Key Psychology Principles

**Light Bulb Effect**
When viewers understand something new, they feel smart. Feeling smart = trusting the teacher.
- Explain clearly at 5th-8th grade reading level
- Use visual metaphors (compare unfamiliar to familiar)
- Two "aha moments" in a video = hooked viewer

**Comprehension Maxing**
Match visuals to words EXACTLY. Every word without visual support risks losing the viewer.
- If you say "Claude Code", show Claude Code
- If you say "automation workflow", show the workflow
- Mismatched visuals = confusion = bounce

**One Standard Deviation Trick**
Don't target the core desire directly - it triggers the BS detector.
- Bad: "Make money with AI" (too direct, screams scam)
- Good: "Automate your business with AI" (implies money without saying it)
- Target a PROXY that implies the core desire

**Value Compression**
Deliver your best content EARLY, not at the end.
- If viewers bounce at 4 minutes, they still got value
- Creates positive association with your channel
- Don't hold the "good stuff" hostage for watch time

---

### Storytelling Tactics (9 Techniques for Retention)

These tactics keep viewers watching through your entire video. Use multiple techniques in every video.

#### 1. Comprehension Maxing
**What**: Match visuals to spoken words exactly
**Why**: Loss of comprehension = bounce. Visual matching gives a second chance to understand.
**How**: If you say it, show it. Every word should have visual support.

#### 2. Hawk-Eye Narratives
**What**: Start broad with context, then zoom narrow to specifics
**Why**: Gives viewers stakes and understanding before diving into details
**How**: "Here's the big picture... now let me show you exactly how"
**Example**: "AI is changing consulting forever. Here's the specific workflow I use..."

#### 3. Visual Metaphors
**What**: Compare hard concepts to things viewers already understand
**Why**: Familiar concepts create bridges to unfamiliar ones
**How**: "Think of Claude's context window like a whiteboard - it can only hold so much"

#### 4. Build Common Ground (ASAP)
**What**: Establish shared experience, references, or problems quickly
**Why**: Brain searches for relatability - if you're "like them", you're trustworthy
**How**: "If you've ever spent hours on a task that should take minutes..."

#### 5. Simplify Ruthlessly
**What**: Explain like a smart 8-year-old would understand
**Why**: Complex is only interesting if understood. Simple = accessible = watched.
**How**: Remove jargon, use short sentences, explain acronyms
**Rule**: Better to over-simplify than confuse

#### 6. Visual Pacing (Stun Gun Switching)
**What**: Change visuals regularly to maintain attention
**Why**: Static visuals = wandering attention. Visual changes = micro-stuns
**How**: Jump cuts, B-roll switches, screen transitions every few seconds

#### 7. Value Compression
**What**: Front-load your best content
**Why**: Viewers who bounce early still got value = positive brand association
**How**: Don't save the best for last. Hit them with value immediately.

#### 8. Proof (Trust Bridge)
**What**: Show credentials, results, screenshots early
**Why**: Assuages the BS detector. Makes educational content credible.
**How**: "I've built 50 automations with this..." or show client results

#### 9. Contrast (The Secret Weapon)
**What**: Create gap between expectation and reality
**Why**: Biggest hook comes from subverted expectations
**How**: Lead viewers one direction, then snap to the other
**Example**: "You'd think this would take hours... it took 4 minutes"

---

### Content Ideation System

Use this system to generate video ideas that have a higher chance of success. It's based on pattern recognition from top performers, not guessing.

#### The 7 Lego Bricks
Every video idea is made of these 7 components. When analyzing outliers or creating new content, break it down:

1. **Topic** - One sentence description of what the video is about
2. **Angle** - The premise, take, or interesting fact that frames it (not just "how to X")
3. **Hook Structure** - Spoken hook + text hook + visual hook (first 5-15 seconds)
4. **Story Structure** - Breakdown, listicle, tutorial, documentary, comparison
5. **Visual Format** - Green screen, screen share, talking head, POV, faceless
6. **Key Visuals** - Specific A-roll, B-roll, animations, graphics
7. **Audio** - Music style, sound effects, voice tone

#### Outlier Analysis Method
Don't guess what will work. Study what already works.

**Step 1: Find Outliers**
- Outlier Score = Video Views / Channel Average Views
- Look for 5x+ outlier videos in your niche
- These are proven winners worth studying

**Step 2: Analyze the 7 Lego Bricks**
For each outlier, document:
- What was the angle (not just topic)?
- What hook structure did they use?
- What story structure kept people watching?
- What visual format did they choose?

**Step 3: Hold Constant + Remix**
- Identify which Lego bricks made it an outlier
- KEEP those bricks constant
- REMIX the remaining bricks with your topic
- Like 5-card poker: keep winning cards, reshuffle others

#### Daily Inspiration Workflow
Build a systematic ideation practice:

1. **Watch List**: Track 20-30 top creators in AI/automation niche
2. **Daily Scan**: Watch 5-10 videos daily, note what catches your attention
3. **Document in 2 categories**:
   - **Daily Inspiration**: Topics, angles, hooks, visuals that interest you
   - **Long-term Patterns**: Hook structures, story formats, visual styles (weekly review)

---

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

---

## Thumbnail Generation with Nano Banana Pro

### Model Selection
**ALWAYS use `gemini-3-pro-image-preview` (Nano Banana Pro)** for thumbnail generation. This model:
- Handles compositing, lighting, and blending automatically
- Maintains likeness from reference images
- Produces professional-quality 16:9 thumbnails at 2K/4K resolution

**DO NOT** use `gemini-2.0-flash-exp-image-generation` for thumbnails - it produces inferior results.

### API Configuration
```python
from google import genai
from google.genai import types

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",  # ALWAYS use this model
    contents=[
        "Reference image 1 - Person to feature (maintain exact likeness):",
        presenter_image,
        "Reference image 2 - Logo to incorporate:",
        logo_image,
        prompt
    ],
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE"],  # IMAGE only, not TEXT
        image_config=types.ImageConfig(
            aspect_ratio="16:9",
            image_size="2K"  # or "4K" for higher quality
        ),
    ),
)
```

### Reference Image Usage
When generating thumbnails, ALWAYS provide:
1. **Presenter image** from `images of me/` - Gemini will maintain exact likeness
2. **Claude Code logo** from `logos/claudecode.png` - For brand integration
3. **Narrative prompt** describing the scene (not keyword lists)

### Prompt Structure (Narrative Style)
Write prompts as scene descriptions, not keyword lists:

**Good (Narrative):**
```
Create a YouTube thumbnail featuring this exact person in this exact pose.

SCENE: The person is on the left side of the frame, pointing towards a glowing
holographic hub on the right. The hub shows the Claude Code logo at its center,
surrounded by 5 floating tool icons.

BACKGROUND: Deep gradient from dark navy blue to rich purple.

TEXT: Large bold white text "BUILDS ANYTHING" in the upper right.

CRITICAL: Maintain the person's exact likeness and pose.
```

**Bad (Keyword list):**
```
YouTube thumbnail, person pointing, tech background, glowing, Claude Code,
purple gradient, white text
```

### Quality Feedback Loop
For production thumbnails, use the feedback loop system in `generate_thumbnails_v6.py`:

```
Pass 1: Initial Generation
    - Generate with Nano Banana Pro
    - Save as {name}_pass1.png

Pass 2: AI Critique
    - Feed image to gemini-2.5-flash with critique prompt
    - Check for: color harmony, lighting match, text readability,
      composition, face quality, logo visibility, edge blending
    - If "APPROVED" in response, stop

Pass 3: Refinement (if needed)
    - Feed original + critique back to Nano Banana Pro
    - Save as {name}_pass2.png
    - Repeat up to max 3 passes
```

**Critique Prompt:**
```
Review this YouTube thumbnail and provide specific, actionable feedback on:

1. COLOR HARMONY: Do colors clash? Is the palette cohesive?
2. LIGHTING MATCH: Does the person's lighting match the scene naturally?
3. TEXT READABILITY: Is text clear and readable at small thumbnail sizes?
4. COMPOSITION: Is there visual balance? Clear focal point?
5. FACE QUALITY: Any distortion, artifacts, or unnatural features?
6. LOGO VISIBILITY: Is the Claude Code logo clear and properly placed?
7. EDGE BLENDING: Any harsh cutout edges or unnatural transitions?
8. OVERALL PROFESSIONAL QUALITY: Would this stand out on YouTube?

If the thumbnail is already high quality, respond with: "APPROVED - no changes needed"
```

### Output Structure
```
outputs/thumbnails/YYYY-MM-DD/
├── {video_slug}_v1_pass1.png      # Initial generation
├── {video_slug}_v1_pass2.png      # After refinement (if needed)
├── {video_slug}_v1_final.png      # Final approved version
├── {video_slug}_v1_final.jpg      # JPG version
├── {video_slug}_v1_critiques.txt  # Saved critique logs
├── {video_slug}_v2_final.png
├── {video_slug}_v3_final.png
...
```

### Common Issues & Fixes
| Issue | Cause | Fix |
|-------|-------|-----|
| Distorted face | Using wrong model | Use `gemini-3-pro-image-preview` |
| White background behind person | Manual PIL compositing | Let Gemini handle compositing |
| Jarring colors | Not using narrative prompts | Describe scene with lighting details |
| Logo missing | Not providing reference | Include logo as separate reference image |
| Text garbled | AI-generated text | Add text with PIL after generation |
