import { jsPDF } from "jspdf";
import {
  drawHeader,
  drawFooter,
} from "./helpers";
import {
  drawCover,
  drawCandidate,
  drawATS,
  drawCareer,
  drawSummary,
  drawHealth,
  drawStrengths,
  drawImprovements,
  drawRecommendations,
  drawSkills,
  drawInterview,
  drawVerdict,
} from "./components";

export function exportPDF(report = {}) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  drawCover(doc, report);

  drawHeader(doc);
  let y = 24;

  y = drawCandidate(doc, report);
  y = drawATS(doc, report, y);
  y = drawCareer(doc, report, y);
  y = drawSummary(doc, report, y);

  doc.addPage();
  drawHeader(doc);
  y = 24;

  y = drawHealth(doc, report, y);
  y = drawStrengths(doc, report, y);
  y = drawImprovements(doc, report, y);
  y = drawRecommendations(doc, report, y);

  doc.addPage();
  drawHeader(doc);
  y = 24;

  y = drawSkills(doc, report, y);
  y = drawInterview(doc, report, y);
  y = drawVerdict(doc, report, y);

  drawFooter(doc);

  const candidate =
    report?.candidate?.name
      ?.trim()
      ?.replace(/\s+/g, "_") || "Candidate";

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  doc.save(
    `VectorCV_Report_${candidate}_${today}.pdf`
  );
}