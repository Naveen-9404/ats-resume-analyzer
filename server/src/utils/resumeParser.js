import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import logger from "../config/logger.js";

const MAX_PAGES = 10;

export const parseResume = async (buffer) => {
  if (!buffer || buffer.length === 0) {
    throw new Error("Resume file is empty.");
  }

  try {
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
    }).promise;

    if (pdf.numPages === 0) {
      throw new Error("PDF contains no pages.");
    }

    if (pdf.numPages > MAX_PAGES) {
      throw new Error(
        `Resume exceeds maximum page limit (${MAX_PAGES}).`
      );
    }

    let text = "";

    for (let page = 1; page <= pdf.numPages; page++) {
      const currentPage = await pdf.getPage(page);

      const content =
        await currentPage.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      text += pageText + "\n";
    }

    text = text
      .replace(/\s+/g, " ")
      .replace(/\n+/g, "\n")
      .trim();

    if (!text) {
      throw new Error(
        "No readable text found. The PDF may be scanned or image-based."
      );
    }

    return text;

  } catch (error) {

    logger.error(
      "Resume parsing failed",
      error
    );

    throw error;
  }
};