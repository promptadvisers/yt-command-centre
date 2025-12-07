const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header,
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign, LevelFormat,
        HeadingLevel, ImageRun, PageBreak } = require('docx');
const fs = require('fs');

// Load thumbnail images
const thumb1 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/semrush_one_v1_unified_dashboard.png");
const thumb2 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/semrush_one_v2_ai_visibility_gap.png");
const thumb3 = fs.readFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/semrush_one_v3_tracker_reveal.png");

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
        run: { size: 32, bold: true, color: "FF6B00", font: "Arial" },
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
      { reference: "numbered-v1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-v2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-v3",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Thumbnail Brief | Semrush One", size: 18, color: "888888" })]
      })] })
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Semrush One - Thumbnail Brief")] }),

      // Meta info
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Video Title: ", bold: true }),
        new TextRun("Semrush One Review: Track Google + AI Search in One Dashboard")
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Date: ", bold: true }),
        new TextRun("December 5, 2025")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Versions: ", bold: true }),
        new TextRun("3 A/B Test Variants")
      ]}),

      // Overview
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Video Overview")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun("Semrush One combines traditional SEO tracking with AI visibility monitoring. The key hook is that your competitors are being recommended by ChatGPT, Perplexity, and Gemini while you're invisible. This thumbnail needs to convey the 'unified dashboard' concept and the fear of missing out on AI search visibility.")
      ]}),

      // Assets
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Available Assets")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Logos")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("logos/semrush logo.png - Full Semrush logo")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("logos/semrush logo icon.png - Icon-only version")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Recommended Presenter Poses")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("pointing_right_smiling.png - For pointing at dashboard/logo")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("speaking_shocked.png - For 'wow' reaction to features")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("thinking_chin_smiling.png - For 'discovery' concept")] }),

      // Version 1
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 1: The Unified Dashboard")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Visual split showing Google + AI logos converging into one dashboard, with presenter pointing at the unified view.")
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FF6B00", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "FF6B00", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("pointing_right_smiling.png - Left side, pointing toward dashboard")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Dark gradient (deep navy #0A1628 to dark purple #1A0A2E)")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Logo", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Semrush logo (full) - Center-right, glowing effect")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Supporting Icons", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Google 'G' icon + ChatGPT icon + Perplexity icon orbiting the Semrush logo")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"ONE DASHBOARD\" - Bold white text, upper area")] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200 }, children: [new TextRun("Composition")] }),
      new Paragraph({ spacing: { after: 50 }, children: [new TextRun("Left 35%: Presenter pointing right")] }),
      new Paragraph({ spacing: { after: 50 }, children: [new TextRun("Center 40%: Semrush logo with orbiting platform icons (Google, ChatGPT, Perplexity, Gemini)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Top 20%: \"ONE DASHBOARD\" text")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v1", level: 0 }, children: [new TextRun("Primary: Semrush Orange #FF6B00")] }),
      new Paragraph({ numbering: { reference: "numbered-v1", level: 0 }, children: [new TextRun("Background: Navy to Purple gradient #0A1628 to #1A0A2E")] }),
      new Paragraph({ numbering: { reference: "numbered-v1", level: 0 }, children: [new TextRun("Text: Pure White #FFFFFF")] }),
      new Paragraph({ numbering: { reference: "numbered-v1", level: 0 }, children: [new TextRun("Glow accents: Soft orange #FF8C42")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"How can I track both Google AND AI search in one place?\" - Conveys the unified solution.")] }),

      // Version 2
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 2: The AI Visibility Gap")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Fear-based hook showing 'invisible' status in AI search. Presenter looking concerned, with visual showing competitor being mentioned while you're not.")
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FF6B00", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "FF6B00", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("speaking_shocked.png - Right side, reacting to the 'invisible' reality")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Dark red to black gradient (#2A0A0A to #0A0A0A) - Warning/danger feel")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Logo", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Semrush icon (smaller) - Bottom corner as 'solution' hint")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Visual Element", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("ChatGPT conversation bubble showing 'I recommend [Competitor]' with crossed-out 'You'")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"AI CAN'T SEE YOU\" - Bold red/white text, center-left")] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200 }, children: [new TextRun("Composition")] }),
      new Paragraph({ spacing: { after: 50 }, children: [new TextRun("Left 50%: AI conversation mockup with 'invisible' message")] }),
      new Paragraph({ spacing: { after: 50 }, children: [new TextRun("Right 40%: Presenter with shocked/concerned expression")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Bottom right corner: Small Semrush icon (solution tease)")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v2", level: 0 }, children: [new TextRun("Primary: Warning Red #D32F2F")] }),
      new Paragraph({ numbering: { reference: "numbered-v2", level: 0 }, children: [new TextRun("Background: Dark red to black #2A0A0A to #0A0A0A")] }),
      new Paragraph({ numbering: { reference: "numbered-v2", level: 0 }, children: [new TextRun("Text: White #FFFFFF with red accents")] }),
      new Paragraph({ numbering: { reference: "numbered-v2", level: 0 }, children: [new TextRun("Semrush Orange #FF6B00 for solution hint")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"Am I invisible to AI search?\" - Fear of missing out, triggers need to check.")] }),

      // Version 3
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("VERSION 3: The Tracker Reveal")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Concept: ", bold: true }),
        new TextRun("Product-focused reveal showing the actual Semrush One interface/dashboard with emphasis on the new AI tracking feature. Clean, premium feel.")
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Visual Elements")] }),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "FF6B00", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Element", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "FF6B00", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Details", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Presenter", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("thinking_chin_smiling.png - Left side, 'discovery' pose")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Background", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Clean gradient: Semrush brand colors (#FF6B00 to #FF8C42)")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Logo", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Semrush full logo - Top center, prominent placement")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Visual Element", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Stylized dashboard mockup with 'AI Visibility' graph trending up")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Text Overlay", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"TRACK AI SEARCH\" - Bold white text below logo")] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200 }, children: [new TextRun("Composition")] }),
      new Paragraph({ spacing: { after: 50 }, children: [new TextRun("Top center: Semrush logo")] }),
      new Paragraph({ spacing: { after: 50 }, children: [new TextRun("Center: \"TRACK AI SEARCH\" text + simplified dashboard visual")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Left 30%: Presenter in discovery pose")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Color Palette")] }),
      new Paragraph({ numbering: { reference: "numbered-v3", level: 0 }, children: [new TextRun("Primary: Semrush Orange #FF6B00")] }),
      new Paragraph({ numbering: { reference: "numbered-v3", level: 0 }, children: [new TextRun("Secondary: Light Orange #FF8C42")] }),
      new Paragraph({ numbering: { reference: "numbered-v3", level: 0 }, children: [new TextRun("Text: Pure White #FFFFFF")] }),
      new Paragraph({ numbering: { reference: "numbered-v3", level: 0 }, children: [new TextRun("Accent: Soft glow effects")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Curiosity Hook")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("\"What's the new feature I haven't heard about?\" - Product reveal curiosity.")] }),

      // A/B Testing Strategy
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("A/B Testing Strategy")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Test Rationale: ", bold: true }),
        new TextRun("These three concepts target different psychological triggers:")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V1 (Unified Dashboard): ", bold: true }),
        new TextRun("Appeals to efficiency seekers - 'solve multiple problems at once'")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V2 (AI Visibility Gap): ", bold: true }),
        new TextRun("Fear-based - 'you're missing out / falling behind'")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "V3 (Tracker Reveal): ", bold: true }),
        new TextRun("Curiosity/new feature - 'what is this new capability?'")
      ]}),

      new Paragraph({ spacing: { before: 150, after: 100 }, children: [
        new TextRun({ text: "Recommended Initial Test: ", bold: true }),
        new TextRun("Start with V1 vs V2 (solution vs. fear) to determine which psychological frame resonates better with your audience on this topic.")
      ]}),

      // Notes
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Production Notes")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("All versions should be 16:9 aspect ratio (1920x1080 or 2560x1440)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Use Nano Banana Pro (gemini-3-pro-image-preview) for generation")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Provide presenter image + Semrush logo as reference images")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Add text overlays with PIL after generation for crisp typography")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Save outputs to: outputs/thumbnails/2025-12-05/semrush_one_v[1-3].png")] }),

      // Page break before samples
      new Paragraph({ children: [new PageBreak()] }),

      // Generated Thumbnail Samples
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Generated Thumbnail Samples")] }),
      new Paragraph({ spacing: { after: 150 }, children: [
        new TextRun("The following thumbnails were generated using Nano Banana Pro (gemini-3-pro-image-preview) with the briefs above:")
      ]}),

      // V1 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V1: The Unified Dashboard")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb1, transformation: { width: 560, height: 315 },
          altText: { title: "V1 Thumbnail", description: "Unified Dashboard concept", name: "v1" } })
      ]}),

      // V2 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V2: The AI Visibility Gap")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb2, transformation: { width: 560, height: 315 },
          altText: { title: "V2 Thumbnail", description: "AI Visibility Gap concept", name: "v2" } })
      ]}),

      // V3 Sample
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("V3: The Tracker Reveal")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new ImageRun({ type: "png", data: thumb3, transformation: { width: 560, height: 315 },
          altText: { title: "V3 Thumbnail", description: "Tracker Reveal concept", name: "v3" } })
      ]})
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnail_briefs/2025-12-05/semrush_one_brief.docx", buffer);
  console.log("Created semrush_one_brief.docx");
});
