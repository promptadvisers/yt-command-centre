const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header,
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign, LevelFormat,
        HeadingLevel, ImageRun, PageBreak } = require('docx');
const fs = require('fs');

// Load thumbnail images
const thumb1 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v1_infinite_loop.png");
const thumb2 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v2_warning.png");
const thumb3 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v3_automation.png");
const thumb4 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v4_insider_secret.png");
const thumb5 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v5_evolution.png");
const thumb6 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/self_improving_v6_blueprint.png");

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "E07A4F", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "333333", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "555555", font: "Arial" },
        paragraph: { spacing: { before: 150, after: 80 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-v1", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-v2", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-v3", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-v4", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-v5", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-v6", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-titles", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Thumbnail Brief | Self-Improving Systems", size: 18, color: "888888" })]
      })] })
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Self-Improving Systems - Thumbnail Brief")] }),

      // Meta info
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Video Title: ", bold: true }),
        new TextRun("How to Build Self-Improving Systems with Claude Code")
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Date: ", bold: true }),
        new TextRun("December 5, 2025")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Versions: ", bold: true }),
        new TextRun("6 A/B Test Variants (Novel Concept - Extra Testing)")
      ]}),

      // Overview
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Video Overview")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("This is a NOVEL concept video - no one has shown this before. The video demonstrates how to use Claude Code to build systems that improve themselves automatically:")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Self-improving chatbot: ", bold: true }),
        new TextRun("Analyzes last 5-10 responses, runs evaluation against rubrics, updates its own prompt")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Self-evolving app: ", bold: true }),
        new TextRun("Monitors user behavior, identifies patterns, proposes and implements new features automatically")
      ]}),
      new Paragraph({ spacing: { before: 100, after: 150 }, children: [
        new TextRun({ text: "Key Hook: ", bold: true }),
        new TextRun("This is AI that improves ITSELF. Not you improving it - the system autonomously gets better over time. This is the future of software.")
      ]}),

      // Psychological Angles
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Psychological Angles to Test")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("Since this is a novel concept, we need to test multiple psychological frames to see what resonates:")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Awe/Wonder: ", bold: true }),
        new TextRun("\"This is mind-blowing\" - the infinite loop, systems that evolve")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Fear/Caution: ", bold: true }),
        new TextRun("\"This is terrifying\" - AI improving itself, Skynet vibes")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Efficiency/Power: ", bold: true }),
        new TextRun("\"Never manually update again\" - set it and forget it")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Insider/Secret: ", bold: true }),
        new TextRun("\"What the top 1% are building\" - exclusive knowledge")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Future/Visionary: ", bold: true }),
        new TextRun("\"The future of software\" - be ahead of everyone")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 150 }, children: [
        new TextRun({ text: "Technical/Builder: ", bold: true }),
        new TextRun("\"Here's the exact architecture\" - appeal to engineers")
      ]}),

      // Assets
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Available Assets")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Logos")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("logos/claudecode.png - Claude Code logo (PRIMARY)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("logos/claude.png - Claude logo")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Recommended Presenter Poses")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("speaking_shocked.png - For awe/fear concepts")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("pointing_right_smiling.png - For pointing at loop/system")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("shhh_finger_lips.png - For insider/secret concept")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("thinking_chin_smiling.png - For discovery/builder concept")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("portrait_skeptical.png - For cautionary angle")] }),

      // VERSION 1: The Infinite Loop
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 1: The Infinite Loop (Awe)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Visual of an infinite loop/ouroboros with Claude Code at the center. The system eating its own tail, constantly improving. Mind-blowing, futuristic.")
      ]}),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("speaking_shocked.png - Left side, amazed expression")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Central Visual", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Glowing infinite loop symbol (lemniscate/ouroboros) with Claude Code logo at center")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Deep space blue/purple gradient with subtle particle effects")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"IT IMPROVES ITSELF\" - Bold white, top area")] })] })
          ]})
        ]
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v1", level: 0 }, children: [new TextRun("Primary: Claude Orange #E07A4F")] }),
      new Paragraph({ numbering: { reference: "numbered-v1", level: 0 }, children: [new TextRun("Background: Space gradient #0A0A1A to #1A0A2E")] }),
      new Paragraph({ numbering: { reference: "numbered-v1", level: 0 }, children: [new TextRun("Glow: Ethereal blue #4A9EFF")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"How is that even possible?\" - Triggers awe and need to understand.")] }),

      // VERSION 2: The Warning/Fear
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 2: The Warning (Fear)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Ominous, slightly scary. AI that improves itself - where does it end? Red warning colors, presenter looking concerned. Taps into Skynet fears.")
      ]}),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("portrait_skeptical.png - Right side, cautious/warning expression")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Central Visual", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Claude Code logo with recursive copies getting smaller, spiraling inward - like a mirror reflecting itself infinitely")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Dark red to black gradient (#2A0A0A to #0A0A0A) - Warning feel")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"AI THAT IMPROVES ITSELF\" - Red/white text, ominous")] })] })
          ]})
        ]
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v2", level: 0 }, children: [new TextRun("Primary: Warning Red #D32F2F")] }),
      new Paragraph({ numbering: { reference: "numbered-v2", level: 0 }, children: [new TextRun("Background: Dark red to black #2A0A0A to #0A0A0A")] }),
      new Paragraph({ numbering: { reference: "numbered-v2", level: 0 }, children: [new TextRun("Claude Orange accent #E07A4F")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"Should we be doing this?\" - Fear + curiosity combo.")] }),

      // VERSION 3: The Automation Dream
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 3: The Automation Dream (Efficiency)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("\"Set it and forget it\" - your system gets better while you sleep. Shows a relaxed presenter while the system works in the background. Appeals to efficiency seekers.")
      ]}),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("thinking_chin_smiling.png - Left side, confident/satisfied expression")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Central Visual", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Claude Code logo with circular arrows showing continuous improvement cycle, graphs trending upward automatically")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Clean gradient: Calming blue to teal (#0A2E4A to #0A4A4A)")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"NEVER UPDATE MANUALLY AGAIN\" - Bold white")] })] })
          ]})
        ]
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v3", level: 0 }, children: [new TextRun("Primary: Teal/Cyan #00B4A0")] }),
      new Paragraph({ numbering: { reference: "numbered-v3", level: 0 }, children: [new TextRun("Background: Blue to teal gradient")] }),
      new Paragraph({ numbering: { reference: "numbered-v3", level: 0 }, children: [new TextRun("Claude Orange accent #E07A4F")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"How can I set this up?\" - Efficiency seekers want the shortcut.")] }),

      // VERSION 4: The Insider Secret
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 4: The Insider Secret")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("\"Shhh... the top builders are doing this\" - Exclusive knowledge that most people don't know about. Finger to lips pose, secretive vibe.")
      ]}),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("shhh_finger_lips.png - Center-left, secretive pose")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Central Visual", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Claude Code logo partially hidden/revealed, like pulling back a curtain")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Dark gradient with spotlight effect - like revealing a secret")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"THE SECRET TOP BUILDERS USE\" - Gold/white text")] })] })
          ]})
        ]
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v4", level: 0 }, children: [new TextRun("Primary: Gold/Amber #FFB800")] }),
      new Paragraph({ numbering: { reference: "numbered-v4", level: 0 }, children: [new TextRun("Background: Dark with spotlight #0A0A0A")] }),
      new Paragraph({ numbering: { reference: "numbered-v4", level: 0 }, children: [new TextRun("Claude Orange accent #E07A4F")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"What do they know that I don't?\" - FOMO on insider knowledge.")] }),

      // VERSION 5: The Evolution
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 5: The Evolution (Future)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("\"This is the future of software\" - Evolutionary visual showing progression from basic to advanced. Be ahead of everyone else.")
      ]}),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("pointing_right_smiling.png - Left side, pointing at evolution visual")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Central Visual", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Evolution chart: Simple code -> AI-assisted -> Self-improving (with Claude Code logo at peak)")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Gradient from dark (past) to bright (future) - left to right")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"THE FUTURE OF SOFTWARE\" - Bold white, gradient glow")] })] })
          ]})
        ]
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v5", level: 0 }, children: [new TextRun("Primary: Electric Blue #00D4FF")] }),
      new Paragraph({ numbering: { reference: "numbered-v5", level: 0 }, children: [new TextRun("Background: Dark to bright gradient")] }),
      new Paragraph({ numbering: { reference: "numbered-v5", level: 0 }, children: [new TextRun("Claude Orange #E07A4F at the peak")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"Am I falling behind?\" - Fear of missing the future.")] }),

      // VERSION 6: The Blueprint
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 6: The Blueprint (Technical)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("\"Here's the exact architecture\" - Technical diagram showing the feedback loop. Appeals to builders who want the implementation details.")
      ]}),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "E07A4F", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("thinking_chin_smiling.png - Left side, builder/architect pose")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Central Visual", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Clean system diagram: Database -> Evaluate -> Update Prompt -> Deploy (circular flow with Claude Code logo in center)")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Dark with subtle grid lines - blueprint/technical feel")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"THE SELF-IMPROVING ARCHITECTURE\" - Clean white text")] })] })
          ]})
        ]
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v6", level: 0 }, children: [new TextRun("Primary: White #FFFFFF for diagram lines")] }),
      new Paragraph({ numbering: { reference: "numbered-v6", level: 0 }, children: [new TextRun("Background: Dark blue-gray #1A1A2E")] }),
      new Paragraph({ numbering: { reference: "numbered-v6", level: 0 }, children: [new TextRun("Accent: Claude Orange #E07A4F for key nodes")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"How does that actually work?\" - Engineers want the implementation.")] }),

      // A/B Testing Strategy
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("A/B Testing Strategy")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Recommended Test Order: ", bold: true })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Round 1: ", bold: true }),
        new TextRun("V1 (Awe) vs V2 (Fear) - Test emotional extremes")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Round 2: ", bold: true }),
        new TextRun("Winner vs V4 (Insider Secret) - Test FOMO angle")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Round 3: ", bold: true }),
        new TextRun("Winner vs V3 (Efficiency) or V6 (Technical) based on audience"
      )]}),
      new Paragraph({ spacing: { before: 150, after: 100 }, children: [
        new TextRun({ text: "Hypothesis: ", bold: true }),
        new TextRun("V1 or V2 will likely win because this is a novel concept - emotional hooks (awe or fear) typically outperform practical angles for breakthrough content.")
      ]}),

      // Recommended Titles
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Recommended Titles")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Top 10 Title Options ", bold: true }),
        new TextRun("(Claude Code prominently featured):")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "How to Build Self-Improving Systems in Claude Code", bold: true }),
        new TextRun(" - 52 chars (How-To + Technical)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "Claude Code Can Now Improve ITSELF (Here's How)", bold: true }),
        new TextRun(" - 49 chars (Feature Reveal)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "I Made Claude Code Rewrite Its Own Prompts", bold: true }),
        new TextRun(" - 45 chars (Personal Experiment)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "The TERRIFYING Claude Code Feature Nobody Talks About", bold: true }),
        new TextRun(" - 54 chars (Emotion + Insider)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "Claude Code's Self-Improving Loop (Full Breakdown)", bold: true }),
        new TextRun(" - 50 chars (Technical + Authority)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "Stop Updating Prompts - Let Claude Code Do It ITSELF", bold: true }),
        new TextRun(" - 53 chars (Contrarian)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "Build AI That Improves While You Sleep (Claude Code)", bold: true }),
        new TextRun(" - 53 chars (Efficiency)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "Claude Code Just Changed Everything (Self-Improving AI)", bold: true }),
        new TextRun(" - 55 chars (FOMO)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "The Claude Code Trick That Makes AI Autonomous", bold: true }),
        new TextRun(" - 49 chars (Insider Secret)")
      ]}),
      new Paragraph({ numbering: { reference: "numbered-titles", level: 0 }, children: [
        new TextRun({ text: "I Built a Self-Healing App with Claude Code", bold: true }),
        new TextRun(" - 46 chars (Personal Experiment)")
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("Title + Thumbnail Pairings")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V1 (Infinite Loop): ", bold: true }),
        new TextRun("Claude Code Can Now Improve ITSELF")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V2 (Warning): ", bold: true }),
        new TextRun("The TERRIFYING Claude Code Feature Nobody Talks About")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V3 (Automation): ", bold: true }),
        new TextRun("Build AI That Improves While You Sleep (Claude Code)")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V4 (Insider Secret): ", bold: true }),
        new TextRun("The Claude Code Trick That Makes AI Autonomous")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V5 (Evolution): ", bold: true }),
        new TextRun("Claude Code Just Changed Everything (Self-Improving AI)")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V6 (Blueprint): ", bold: true }),
        new TextRun("How to Build Self-Improving Systems in Claude Code")
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("Launch Strategy")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Launch: ", bold: true }),
        new TextRun("\"How to Build Self-Improving Systems in Claude Code\" (clear, searchable)")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "24hr Backup: ", bold: true }),
        new TextRun("\"Claude Code Can Now Improve ITSELF (Here's How)\" (more curiosity)")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "48hr Backup: ", bold: true }),
        new TextRun("\"The TERRIFYING Claude Code Feature Nobody Talks About\" (viral push)")
      ]}),

      // Production Notes
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Production Notes")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("All versions: 16:9 aspect ratio (1920x1080 or 2560x1440)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Use Nano Banana Pro (gemini-3-pro-image-preview) for generation")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Provide presenter image + Claude Code logo as reference images")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Add text overlays with PIL after generation for crisp typography")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Save outputs to: outputs/thumbnails/2025-12-05/self_improving_v[1-6].png")] }),

      // Page break before samples
      new Paragraph({ children: [new PageBreak()] }),

      // Generated Thumbnail Samples
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Generated Thumbnail Samples")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun("The following thumbnails were generated using Nano Banana Pro (gemini-3-pro-image-preview) with the briefs above:")
      ]}),

      // V1 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V1: The Infinite Loop (Awe)")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb1, transformation: { width: 500, height: 281 },
          altText: { title: "V1 Thumbnail", description: "Infinite Loop concept", name: "v1" } })
      ]}),

      // V2 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V2: The Warning (Fear)")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb2, transformation: { width: 500, height: 281 },
          altText: { title: "V2 Thumbnail", description: "Warning concept", name: "v2" } })
      ]}),

      // V3 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V3: The Automation Dream (Efficiency)")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb3, transformation: { width: 500, height: 281 },
          altText: { title: "V3 Thumbnail", description: "Automation concept", name: "v3" } })
      ]}),

      // Page break for remaining samples
      new Paragraph({ children: [new PageBreak()] }),

      // V4 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V4: The Insider Secret")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb4, transformation: { width: 500, height: 281 },
          altText: { title: "V4 Thumbnail", description: "Insider Secret concept", name: "v4" } })
      ]}),

      // V5 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V5: The Evolution (Future)")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb5, transformation: { width: 500, height: 281 },
          altText: { title: "V5 Thumbnail", description: "Evolution concept", name: "v5" } })
      ]}),

      // V6 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V6: The Blueprint (Technical)")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb6, transformation: { width: 500, height: 281 },
          altText: { title: "V6 Thumbnail", description: "Blueprint concept", name: "v6" } })
      ]})
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnail_briefs/2025-12-05/self_improving_systems_brief.docx", buffer);
  console.log("Created self_improving_systems_brief.docx");
});
