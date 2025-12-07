# Semrush One Sponsor Video Brief

**Creator:** Mark Kashef
**Channel:** AI & Automation
**Sponsor:** Semrush
**Product:** Semrush One (Advanced Plan)

---

## Executive Summary

This video will showcase Semrush One's capabilities through a unique angle: **building a fully automated SEO optimization system using Claude Code + Semrush API**. Unlike typical software demos, viewers will walk away with a working AI-powered SEO tool they can use immediately for any industry.

**Why Advanced Plan is Required:** API access is exclusive to the Advanced tier ($549/mo) - and the API integration is the core differentiator that makes this video unique and valuable.

---

## Title Options

| Rank | Title | Character Count |
|------|-------|-----------------|
| **1** | **How to Run AI SEO on Easy Mode in 2026** | 42 |
| 2 | AI SEO in 2026: The Complete Automation Playbook | 49 |
| 3 | I Built an AI That Does My SEO For Me | 38 |
| 4 | The AI SEO Cheat Code Nobody's Using Yet | 42 |
| 5 | Stop Doing SEO Manually... Use This Instead | 45 |

**Recommended Title:** "How to Run AI SEO on Easy Mode in 2026"
- Forward-looking authority (2026)
- "Easy Mode" gaming reference resonates with tech audience
- Clean, scannable, optimal length

---

## Video Structure

**Estimated Length:** 20-25 minutes

### Act 1: The Hook & Problem (0:00 - 4:00)

#### Cold Open (0:00 - 0:45)
> "In 2026, SEO isn't just about Google anymore. ChatGPT, Perplexity, Gemini - they're all answering questions that used to send traffic to your site. And while most people are still manually checking rankings one keyword at a time, I built a system that analyzes any website, finds exactly what's missing, and tells you what to create next - in under 60 seconds. Let me show you how."

#### The Shift (0:45 - 2:30)
- The old SEO workflow is broken:
  - Manually checking rankings
  - Guessing what content to create
  - No visibility into AI search platforms
- The new reality: AI search engines (ChatGPT, Perplexity, Gemini) are stealing traffic
- You need visibility across ALL search platforms, not just Google

#### Introduce Semrush One (2:30 - 4:00)
- First platform to unify traditional SEO + AI visibility tracking
- Show the key differentiator: AI Visibility Toolkit
- Semrush's own results: 13% → 32% AI share of voice in ONE month

---

### Act 2: Semrush One Platform Demo (4:00 - 10:00)

#### Traditional SEO Features (4:00 - 6:30)
- **Keyword Research:** Personalized difficulty scoring based on YOUR domain
- **Site Audit:** Technical issues detection with prioritized fixes
- **Competitor Analysis:** See exactly who's ranking for your target keywords
- **Rank Tracking:** Daily position monitoring across 142 keyword databases

#### AI Visibility Toolkit (6:30 - 10:00)
*This is Semrush One's crown jewel - emphasize heavily*

| Feature | What It Shows |
|---------|---------------|
| AI Visibility Score | How often your brand appears in AI-generated answers |
| Prompt Research | What prompts/questions trigger mentions of your brand |
| Brand Sentiment | How AI platforms describe your brand (positive/negative/neutral) |
| Citation Tracking | Which of your pages AI models cite as sources |
| AI Crawlability | Whether AI can actually access and understand your content |

**Key Talking Point:** "This is the data nobody else is showing you. While your competitors are optimizing for Google 2015, you're optimizing for search in 2026."

---

### Act 3: The Build - Claude Code SEO Optimizer (10:00 - 20:00)

#### The Concept (10:00 - 11:00)
> "But here's where it gets interesting. What if you could take all of this data and automate the entire analysis? That's exactly what we're going to build right now using Claude Code and the Semrush API."

#### Why This Matters for Any Industry (11:00 - 12:00)

| Industry | SEO Pain Point | How This Solves It |
|----------|----------------|-------------------|
| **Real Estate** | Local keyword competition, neighborhood pages | Auto-generates location-based content briefs |
| **E-commerce** | Thousands of product pages to optimize | Bulk analysis with prioritized recommendations |
| **SaaS** | Feature comparison keywords, competitor content | Identifies content gaps vs competitors |
| **Local Services** | "Near me" searches, Google Business visibility | Local SEO audit with actionable fixes |
| **Content Creators** | Finding untapped topics, difficulty scoring | Discovers low-competition, high-volume opportunities |
| **Agencies** | Managing multiple client SEO strategies | Scalable analysis across unlimited domains |

#### API Walkthrough (12:00 - 14:00)
Show the Semrush API documentation and key endpoints:

```
Endpoint                  | What It Returns                    | Cost
--------------------------|------------------------------------|-----------
phrase_this               | Keyword volume, CPC, difficulty    | 10 units
phrase_related            | Related keywords & variations      | 40 units
phrase_questions          | Questions people ask               | 40 units
phrase_kdi                | Keyword difficulty scores          | 50 units
domain_organic            | Keywords a domain ranks for        | 10 units
phrase_organic            | Who ranks for a specific keyword   | 10 units
```

#### Live Build in Claude Code (14:00 - 18:00)
Build the SEO Optimizer step-by-step:
1. Set up Semrush API authentication
2. Create keyword analysis function
3. Add competitor gap analysis
4. Build content brief generator
5. Test with real website

#### Demo the Working App (18:00 - 20:00)
- Input: Any URL from any industry
- Output: Complete SEO analysis with actionable recommendations
- Show the "wow" moment: 60-second full site analysis

---

### Act 4: Wrap-up & CTA (20:00 - end)

#### Summary
- Traditional SEO tracking ✓
- AI visibility (where search is going) ✓
- API access for automation (what separates pros from amateurs) ✓

#### Call to Action
1. Link to Semrush One (sponsor link)
2. Link to the Claude Code SEO Optimizer template (Gumroad)
3. "If you want to stop doing SEO the hard way, the link is in the description"

---

## The Claude Code SEO Optimizer App

### What It Does

A Claude Code skill/MCP server that connects to Semrush API to provide instant, comprehensive SEO analysis for any website in any industry.

### App Features

```
┌─────────────────────────────────────────────────────────────────┐
│                    SEO OPTIMIZER - CLAUDE CODE                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INPUTS:                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ URL: https://example.com                                │   │
│  │ Industry: [Auto-detected or specified]                  │   │
│  │ Target Market: [US/UK/Global]                           │   │
│  │ Competitors: [Optional - auto-discovered if blank]      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  OUTPUTS:                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. CURRENT RANKINGS SNAPSHOT                            │   │
│  │    - Top 20 keywords you rank for                       │   │
│  │    - Position, volume, traffic estimate                 │   │
│  │                                                         │   │
│  │ 2. COMPETITOR GAP ANALYSIS                              │   │
│  │    - Keywords competitors rank for that you don't       │   │
│  │    - Sorted by opportunity (volume vs difficulty)       │   │
│  │                                                         │   │
│  │ 3. QUICK WINS                                           │   │
│  │    - Keywords where you're positions 4-20               │   │
│  │    - Easiest to move to page 1                          │   │
│  │                                                         │   │
│  │ 4. CONTENT BRIEF                                        │   │
│  │    - Recommended next piece of content                  │   │
│  │    - Target keyword + related terms                     │   │
│  │    - Questions to answer                                │   │
│  │    - Competitor content to beat                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Industry-Specific Analysis

The app automatically adapts its analysis based on industry:

| Industry | Special Analysis |
|----------|------------------|
| Real Estate | Local market keywords, neighborhood terms, "homes for sale in [location]" patterns |
| E-commerce | Product category gaps, buyer intent keywords, comparison terms |
| SaaS | Feature keywords, "[product] vs [competitor]" opportunities, integration terms |
| Healthcare | Symptom keywords, treatment terms, local practitioner searches |
| Legal | Practice area keywords, "[service] lawyer near me" patterns |
| Restaurants | Menu item searches, "[cuisine] near me", review-related terms |

---

## Claude Code Prompt

Use this prompt in Claude Code to build the SEO Optimizer:

```markdown
# SEO Optimizer Build Prompt

Build me an SEO analysis tool that uses the Semrush API. Here's what I need:

## Setup
- Use the Semrush API (documentation: https://developer.semrush.com/api/)
- API key will be stored in environment variable: SEMRUSH_API_KEY
- Base endpoint: https://api.semrush.com/

## Core Functions

### 1. analyze_domain(url, database="us")
Pull the top 50 organic keywords for a domain using the `domain_organic` endpoint.
Return: keyword, position, volume, traffic%, CPC, competition, URL

### 2. get_keyword_data(keywords[], database="us")
For a list of keywords, get volume, difficulty, and CPC using `phrase_these` endpoint.
Return: keyword, volume, difficulty, CPC, competition

### 3. find_related_keywords(seed_keyword, database="us", limit=20)
Get related keywords and questions using `phrase_related` and `phrase_questions`.
Return: keyword, volume, difficulty, type (related/question)

### 4. competitor_gap(my_domain, competitor_domains[], database="us")
Find keywords competitors rank for that my_domain doesn't.
Use `domain_organic` for each domain, then diff.
Return: keyword, competitor_position, volume, difficulty, opportunity_score

### 5. find_quick_wins(url, database="us")
Find keywords where domain ranks positions 4-20 with decent volume.
These are easiest to move to page 1.
Return: keyword, current_position, volume, difficulty, estimated_clicks_if_page_1

## Main Analysis Function

### run_full_analysis(url, industry=None, competitors=[])

1. Detect or use provided industry
2. Run analyze_domain() on the URL
3. Auto-discover competitors if not provided (top 3 domains ranking for same keywords)
4. Run competitor_gap() analysis
5. Find quick_wins()
6. Generate a content brief for the #1 opportunity

## Output Format

Return a structured markdown report with:
- Executive Summary (3 bullet points)
- Current Rankings Table (top 20)
- Competitor Gap Opportunities (top 10)
- Quick Wins (top 5)
- Recommended Content Brief (1 detailed brief)

## Industry Adaptation

Based on detected/provided industry, adjust the analysis:
- Real Estate: Prioritize local keywords, "[city] homes for sale" patterns
- E-commerce: Focus on product/category keywords, buyer intent terms
- SaaS: Look for comparison keywords, feature terms, integration opportunities
- Local Services: Emphasize "near me" keywords, service area terms

## Error Handling
- Handle API rate limits (max 10 requests/second)
- Graceful fallback if API units exhausted
- Clear error messages for invalid domains

Make this production-ready with clean code, comments, and a great CLI experience.
```

---

## What We Need From Semrush

| Item | Purpose | Priority |
|------|---------|----------|
| **Semrush One Advanced Plan** | API access is only on Advanced tier | Required |
| **API Units** | 10,000+ for live demo builds | Required |
| **High-res Logo** | Thumbnail + video overlay | Required |
| **Key Messaging Points** | Any specific features to emphasize | Optional |
| **Promo Code/Link** | Custom tracking for audience | Required |
| **Screenshot Approval** | Any specific views they want shown | Optional |

---

## Deliverables

### From Mark Kashef:

1. **Video** (20-25 min)
   - Full Semrush One demo
   - Live Claude Code build
   - Working app demonstration

2. **Claude Code Template**
   - Complete SEO Optimizer skill
   - Available on Gumroad
   - Works for any industry

3. **Thumbnail** (3 versions for A/B testing)
   - Following 4 C's framework
   - Semrush branding integrated

4. **Video Description**
   - Full timestamps
   - SEO-optimized hashtags
   - Sponsor links

---

## Why This Video Works for Semrush

| Semrush Goal | How This Video Delivers |
|--------------|------------------------|
| Promote Semrush One | Full platform demo + AI visibility features |
| Differentiate from Ahrefs/Moz | API automation angle nobody else covers |
| Target technical/agency audience | Claude Code integration attracts power users |
| Drive Advanced plan sales | Shows why API access matters (only on Advanced) |
| Demonstrate ROI | Live demo = clear, tangible value |
| Evergreen content | Template keeps driving signups long-term |

---

## Timeline & Next Steps

1. Semrush approves brief and provides Advanced plan access
2. Mark builds and tests the Claude Code SEO Optimizer
3. Video production (script → film → edit)
4. Thumbnail creation (3 versions)
5. Semrush reviews final cut
6. Publish with coordinated promotion

---

## Contact

**Mark Kashef**
YouTube: [Channel Link]
Email: [Email]
Community: https://www.skool.com/earlyaidopters/about
