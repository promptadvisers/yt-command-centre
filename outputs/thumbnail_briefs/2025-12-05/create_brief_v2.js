const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, VerticalAlign, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

// Load FINAL thumbnail images (from feedback loop)
const thumbnailV1 = fs.readFileSync('/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/claude_code_swiss_knife_v1_final.png');
const thumbnailV2 = fs.readFileSync('/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/claude_code_swiss_knife_v2_final.png');
const thumbnailV3 = fs.readFileSync('/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnails/2025-12-05/claude_code_swiss_knife_v3_final.png');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: "7C3AED", font: "Arial" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "3B82F6", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "title-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // Title
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun("YouTube Thumbnail Brief")]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({ text: "Claude Code Swiss Army Knife Video", size: 32, color: "666666" })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({ text: "Date: December 5, 2025 | Version: 2.0", size: 22, color: "999999" })
        ]
      }),

      // Video Overview
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Video Overview")] }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("This video showcases Claude Code's versatility as a \"Swiss Army knife\" for building middleware apps. The core message: stop paying for single-purpose web apps when Claude Code can do it all.")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "5 Demos in the Video:", bold: true })]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Video splitting (split long videos in half)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Image format conversion (PNG to JPG, WEBP, etc.)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("PDF merging/splitting")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Audio extraction from video (MP4 to MP3)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 300 }, children: [new TextRun("AI image editing with Gemini API (background changes)")] }),

      // Possible Titles
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Possible Titles")] }),
      new Paragraph({ numbering: { reference: "title-list", level: 0 }, children: [new TextRun({ text: "Claude Code Can Build ANYTHING (I'll Prove It)", bold: true }), new TextRun(" - High-Stakes Curiosity + Proof")] }),
      new Paragraph({ numbering: { reference: "title-list", level: 0 }, children: [new TextRun({ text: "5 Apps I Built in Claude Code (No Coding Required)", bold: true }), new TextRun(" - Extreme Efficiency")] }),
      new Paragraph({ numbering: { reference: "title-list", level: 0 }, children: [new TextRun({ text: "I Replaced 5 Apps with Claude Code", bold: true }), new TextRun(" - Pattern Interrupt")] }),
      new Paragraph({ numbering: { reference: "title-list", level: 0 }, children: [new TextRun({ text: "Claude Code Does WAY More Than You Think", bold: true }), new TextRun(" - Curiosity Gap")] }),
      new Paragraph({ numbering: { reference: "title-list", level: 0 }, children: [new TextRun({ text: "The Claude Code Features Nobody Talks About", bold: true }), new TextRun(" - Insider Secret")] }),
      new Paragraph({ numbering: { reference: "title-list", level: 0 }, children: [new TextRun({ text: "Claude Code is a Swiss Army Knife for Developers", bold: true }), new TextRun(" - Metaphor")] }),
      new Paragraph({ numbering: { reference: "title-list", level: 0 }, children: [new TextRun({ text: "Stop Using These Apps (Use Claude Code Instead)", bold: true }), new TextRun(" - Contrarian")] }),
      new Paragraph({ numbering: { reference: "title-list", level: 0 }, spacing: { after: 300 }, children: [new TextRun({ text: "Why I Stopped Paying for Middleware Apps", bold: true }), new TextRun(" - Personal Story")] }),

      // Words for Thumbnail
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Words for Thumbnail")] }),
      new Paragraph({ children: [new TextRun({ text: "Set 1:", bold: true, color: "7C3AED" }), new TextRun(" BUILDS ANYTHING / CLAUDE CODE")] }),
      new Paragraph({ children: [new TextRun({ text: "Set 2:", bold: true, color: "7C3AED" }), new TextRun(" SWISS ARMY KNIFE / FOR DEVELOPERS")] }),
      new Paragraph({ children: [new TextRun({ text: "Set 3:", bold: true, color: "7C3AED" }), new TextRun(" REPLACED 5 APPS / WITH THIS")] }),
      new Paragraph({ children: [new TextRun({ text: "Set 4:", bold: true, color: "7C3AED" }), new TextRun(" NO MORE / SUBSCRIPTIONS")] }),
      new Paragraph({ children: [new TextRun({ text: "Set 5:", bold: true, color: "7C3AED" }), new TextRun(" VIDEO - IMAGE - PDF / ALL IN ONE")] }),
      new Paragraph({ children: [new TextRun({ text: "Set 6:", bold: true, color: "7C3AED" }), new TextRun(" STOP PAYING / FOR THIS")] }),
      new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: "Set 7:", bold: true, color: "7C3AED" }), new TextRun(" 5 APPS / 1 TOOL")] }),

      // Visual Concepts
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Visual Concept Suggestions")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Collage Concept: ", bold: true }), new TextRun("Mark pointing at 5 tool icons (video scissors, image converter, PDF merge, audio wave, AI sparkle) arranged around glowing Claude Code logo")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Swiss Army Knife: ", bold: true }), new TextRun("Stylized Swiss Army knife with each blade labeled (VIDEO, IMAGE, PDF, AUDIO, AI) - Mark with shocked expression beside it")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Before/After Split: ", bold: true }), new TextRun("Left side shows greyed-out app logos (Zamzar, CloudConvert, etc.) with X marks, right side shows vibrant Claude Code terminal")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Processing Stack: ", bold: true }), new TextRun("Mark pointing at a \"stack\" of file types being processed by Claude Code (video to audio, PDF to merged PDF, etc.)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Large Number: ", bold: true }), new TextRun("Big \"5\" with each section showing a different operation happening")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 300 }, children: [new TextRun({ text: "Terminal Window: ", bold: true }), new TextRun("Claude Code terminal showing multiple operations, Mark giving thumbs up")] }),

      // Presenter Poses Table
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Presenter Pose Recommendations")] }),
      new Table({
        columnWidths: [2800, 3500, 3060],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, shading: { fill: "7C3AED", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Concept", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "7C3AED", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Recommended Pose", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3060, type: WidthType.DXA }, shading: { fill: "7C3AED", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Emotional Promise", bold: true, color: "FFFFFF" })] })] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Exciting reveal")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "pointing_right_both_hands_shocked.png", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3060, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"This is amazing!\"")] })] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Versatility demo")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "pointing_right_smiling.png", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3060, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"Let me show you\"")] })] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Contrarian/proof")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "portrait_skeptical.png", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3060, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"I'll prove it\"")] })] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Insider secret")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "shhh_finger_lips.png", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3060, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("\"Hidden capability\"")] })] }),
            ]
          }),
        ]
      }),

      // Color Palette
      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun("Color Palette")] }),
      new Paragraph({ children: [new TextRun({ text: "Primary: ", bold: true }), new TextRun("#7C3AED (Purple) - Intelligence, premium")] }),
      new Paragraph({ children: [new TextRun({ text: "Secondary: ", bold: true }), new TextRun("#E07A4F (Claude Orange) - Brand recognition")] }),
      new Paragraph({ children: [new TextRun({ text: "Accent: ", bold: true }), new TextRun("#3B82F6 (Blue) - Tech, trust")] }),
      new Paragraph({ children: [new TextRun({ text: "Energy: ", bold: true }), new TextRun("#F97316 (Orange) - Excitement")] }),
      new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: "Recommended Gradients: ", bold: true }), new TextRun("Purple to Blue or Orange to Red")] }),

      // Page break before thumbnails
      new Paragraph({ children: [new PageBreak()] }),

      // Sample Thumbnails
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Sample Thumbnails (A/B Test Concepts)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Three distinct concepts generated for testing. Each tests a different psychological hook. Presenter images are cleanly composited onto AI-generated backgrounds.", italics: true, color: "666666" })] }),

      // Thumbnail V1
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Version 1: Safe Concept - Tool Collage")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Pose: ", bold: true }), new TextRun("pointing_right_both_hands_shocked.png | "), new TextRun({ text: "Text: ", bold: true }), new TextRun("BUILDS ANYTHING")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new ImageRun({
          type: "png",
          data: thumbnailV1,
          transformation: { width: 560, height: 315 },
          altText: { title: "Thumbnail V1", description: "Tool collage concept", name: "V1" }
        })]
      }),

      // Thumbnail V2
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Version 2: Emotion Concept - Swiss Army Knife")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Pose: ", bold: true }), new TextRun("speaking_shocked.png | "), new TextRun({ text: "Text: ", bold: true }), new TextRun("SWISS ARMY KNIFE")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new ImageRun({
          type: "png",
          data: thumbnailV2,
          transformation: { width: 560, height: 315 },
          altText: { title: "Thumbnail V2", description: "Swiss army knife concept", name: "V2" }
        })]
      }),

      // Thumbnail V3
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Version 3: Contrast Concept - Before/After")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Pose: ", bold: true }), new TextRun("portrait_skeptical.png | "), new TextRun({ text: "Text: ", bold: true }), new TextRun("REPLACED 5 APPS")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new ImageRun({
          type: "png",
          data: thumbnailV3,
          transformation: { width: 560, height: 315 },
          altText: { title: "Thumbnail V3", description: "Before/after contrast concept", name: "V3" }
        })]
      }),

      // Notes section
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Notes for Thumbnail Team")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("These are AI-generated mockups - use as concept references, not final assets")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Presenter cutout images are available in the \"images of me/\" folder")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Claude Code logo (pixel art style) is in \"logos/claudecode.png\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Follow the 4 C's: Composition, Color, Clean Assets, Curiosity")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("NO black borders - edge-to-edge images only")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Text must be BIG and readable at small thumbnail sizes")] }),
    ]
  }]
});

// Save the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/Users/marwankashef/Desktop/YouTube/YT Command Centre/outputs/thumbnail_briefs/2025-12-05/claude_code_swiss_knife_brief.docx', buffer);
  console.log('DOCX created successfully!');
});
