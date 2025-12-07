const { Document, Packer, Paragraph, TextRun, Header, AlignmentType, LevelFormat,
        HeadingLevel, ImageRun, PageBreak } = require('docx');
const fs = require('fs');

// Load thumbnail images
const thumb1 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v1_infinite_loop.png");
const thumb2 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v2_warning.png");
const thumb3 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v3_automation.png");
const thumb4 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v4_insider_secret.png");
const thumb5 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v5_evolution.png");
const thumb6 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v6_blueprint.png");

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "E07A4F", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "333333", font: "Arial" },
        paragraph: { spacing: { before: 160, after: 60 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Thumbnail Brief", size: 16, color: "999999" })]
      })] })
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Self-Improving Systems in Claude Code")] }),

      // Video Overview - compact
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Video Overview")] }),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "What: ", bold: true }),
        new TextRun("Tutorial on building AI systems that improve themselves automatically using Claude Code.")
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Demos: ", bold: true }),
        new TextRun("(1) Chatbot that evaluates responses & updates its own prompt, (2) App that monitors user behavior & proposes new features.")
      ]}),
      new Paragraph({ spacing: { after: 80 }, children: [
        new TextRun({ text: "Why it matters: ", bold: true }),
        new TextRun("NOVEL concept - AI that improves ITSELF without human intervention. Slightly scary, very compelling.")
      ]}),

      // Psychological Angles - compact
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Psychological Angles")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Awe: ", bold: true }), new TextRun("\"Mind-blowing\" - infinite loop, systems that evolve")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Fear: ", bold: true }), new TextRun("\"Terrifying\" - AI improving itself, Skynet vibes")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Efficiency: ", bold: true }), new TextRun("\"Set it and forget it\" - never manually update")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Insider: ", bold: true }), new TextRun("\"What top 1% are building\" - exclusive knowledge")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Future: ", bold: true }), new TextRun("\"The future of software\" - be ahead of everyone")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 80 }, children: [
        new TextRun({ text: "Technical: ", bold: true }), new TextRun("\"Exact architecture\" - appeals to engineers")
      ]}),

      // Recommended Titles
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Recommended Titles")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "How to Build Self-Improving Systems in Claude Code", bold: true })
      ]}),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Claude Code Can Now Improve ITSELF (Here's How)", bold: true })
      ]}),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "I Made Claude Code Rewrite Its Own Prompts", bold: true })
      ]}),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "The TERRIFYING Claude Code Feature Nobody Talks About", bold: true })
      ]}),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, spacing: { after: 80 }, children: [
        new TextRun({ text: "Stop Updating Prompts - Let Claude Code Do It ITSELF", bold: true })
      ]}),

      // A/B Testing Strategy
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("A/B Testing Strategy")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Round 1: ", bold: true }), new TextRun("V1 (Awe) vs V2 (Fear) - emotional extremes")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Round 2: ", bold: true }), new TextRun("Winner vs V4 (Insider) - test FOMO")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 60 }, children: [
        new TextRun({ text: "Round 3: ", bold: true }), new TextRun("Winner vs V3 or V6 based on audience")
      ]}),
      new Paragraph({ spacing: { after: 80 }, children: [
        new TextRun({ text: "Hypothesis: ", bold: true }),
        new TextRun("V1 or V2 will win - emotional hooks beat practical for novel content.")
      ]}),

      // Launch Strategy
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Launch Strategy")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "Launch: ", bold: true }), new TextRun("\"How to Build Self-Improving Systems in Claude Code\"")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 40 }, children: [
        new TextRun({ text: "24hr Backup: ", bold: true }), new TextRun("\"Claude Code Can Now Improve ITSELF (Here's How)\"")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "48hr Viral: ", bold: true }), new TextRun("\"The TERRIFYING Claude Code Feature Nobody Talks About\"")
      ]}),

      // Page break before thumbnails
      new Paragraph({ children: [new PageBreak()] }),

      // VERSION 1
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("V1: The Infinite Loop")] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Psychology: ", bold: true, color: "E07A4F" }), new TextRun("Awe / Wonder")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Glowing infinite loop with Claude Code at center. Mind-blowing, futuristic.")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Text: ", bold: true }), new TextRun("\"IT IMPROVES ITSELF\"")
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Colors: ", bold: true }), new TextRun("Space blue/purple (#0A0A1A-#1A0A2E), Claude Orange (#E07A4F), Blue glow (#4A9EFF)")
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
        new ImageRun({ type: "png", data: thumb1, transformation: { width: 480, height: 270 },
          altText: { title: "V1", description: "Infinite Loop", name: "v1" } })
      ]}),

      // VERSION 2
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("V2: The Warning")] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Psychology: ", bold: true, color: "E07A4F" }), new TextRun("Fear / Caution")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Recursive Claude logos spiraling inward. Ominous, Skynet vibes.")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Text: ", bold: true }), new TextRun("\"AI THAT IMPROVES ITSELF\"")
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Colors: ", bold: true }), new TextRun("Dark red to black (#2A0A0A-#0A0A0A), Warning red (#D32F2F)")
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
        new ImageRun({ type: "png", data: thumb2, transformation: { width: 480, height: 270 },
          altText: { title: "V2", description: "Warning", name: "v2" } })
      ]}),

      // VERSION 3
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("V3: The Automation Dream")] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Psychology: ", bold: true, color: "E07A4F" }), new TextRun("Efficiency")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Clean cycle visualization, graphs trending up automatically.")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Text: ", bold: true }), new TextRun("\"NEVER UPDATE MANUALLY AGAIN\"")
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Colors: ", bold: true }), new TextRun("Blue to teal (#0A2E4A-#0A4A4A), Cyan (#00B4A0)")
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
        new ImageRun({ type: "png", data: thumb3, transformation: { width: 480, height: 270 },
          altText: { title: "V3", description: "Automation", name: "v3" } })
      ]}),

      new Paragraph({ children: [new PageBreak()] }),

      // VERSION 4
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("V4: The Insider Secret")] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Psychology: ", bold: true, color: "E07A4F" }), new TextRun("Exclusivity / FOMO")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Dramatic spotlight revealing Claude Code like pulling back a curtain.")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Text: ", bold: true }), new TextRun("\"THE SECRET TOP BUILDERS USE\"")
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Colors: ", bold: true }), new TextRun("Dark spotlight (#0A0A0A), Gold (#FFB800)")
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
        new ImageRun({ type: "png", data: thumb4, transformation: { width: 480, height: 270 },
          altText: { title: "V4", description: "Insider", name: "v4" } })
      ]}),

      // VERSION 5
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("V5: The Evolution")] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Psychology: ", bold: true, color: "E07A4F" }), new TextRun("Future / Visionary")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Evolution staircase: basic code > AI-assisted > self-improving (Claude at peak).")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Text: ", bold: true }), new TextRun("\"THE FUTURE OF SOFTWARE\"")
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Colors: ", bold: true }), new TextRun("Dark to bright gradient, Electric Blue (#00D4FF)")
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
        new ImageRun({ type: "png", data: thumb5, transformation: { width: 480, height: 270 },
          altText: { title: "V5", description: "Evolution", name: "v5" } })
      ]}),

      // VERSION 6
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("V6: The Blueprint")] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Psychology: ", bold: true, color: "E07A4F" }), new TextRun("Technical / Builder")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Clean system diagram: Database > Evaluate > Update Prompt > Deploy loop.")
      ]}),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Text: ", bold: true }), new TextRun("\"THE SELF-IMPROVING ARCHITECTURE\"")
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Colors: ", bold: true }), new TextRun("Dark blue-gray (#1A1A2E), White lines, Orange nodes")
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new ImageRun({ type: "png", data: thumb6, transformation: { width: 480, height: 270 },
          altText: { title: "V6", description: "Blueprint", name: "v6" } })
      ]})
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnail_briefs/2025-12-05/self_improving_systems_brief.docx", buffer);
  console.log("Created self_improving_systems_brief.docx");
});
