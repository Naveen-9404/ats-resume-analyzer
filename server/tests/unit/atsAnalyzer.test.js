import { describe, it, expect } from "vitest";
import { analyzeResume } from "../../src/utils/atsAnalyzer.js";
import { calculateATSScore } from "../../src/utils/atsScore.js";

describe("ATS Analyzer", () => {
  it("should match keywords and calculate correct score", () => {
    const text = "I am a React and Node developer with API experience.";
    const result = analyzeResume(text);
    
    expect(result.matched).toContain("react");
    expect(result.matched).toContain("node");
    expect(result.matched).toContain("api");
    expect(result.missing).toContain("python");
    
    // 3 matched out of 10 keywords = 30%
    expect(result.score).toBe(30);
  });

  it("should handle empty resume text", () => {
    const result = analyzeResume("");
    
    expect(result.matched).toHaveLength(0);
    expect(result.missing).toHaveLength(10);
    expect(result.score).toBe(0);
  });

  it("should handle duplicate keywords correctly without inflating score", () => {
    const text = "react react react react";
    const result = analyzeResume(text);
    
    expect(result.matched).toHaveLength(1);
    expect(result.matched).toContain("react");
    expect(result.score).toBe(10); // 1 / 10
  });

  it("should never exceed 100 or fall below 0", () => {
    const allKeywords = "react node mongodb javascript express api sql html css python";
    const result = analyzeResume(allKeywords);
    
    expect(result.score).toBe(100);
    expect(result.matched).toHaveLength(10);
    expect(result.missing).toHaveLength(0);
  });
  
  it("should handle boundary matches like capitalization", () => {
    const text = "REACT NODE mOnGoDb";
    const result = analyzeResume(text);
    
    expect(result.matched).toContain("react");
    expect(result.matched).toContain("node");
    expect(result.matched).toContain("mongodb");
    expect(result.score).toBe(30);
  });
});

describe("Production ATS Scoring Engine (calculateATSScore)", () => {
  it("should explicitly return empty matched and missing arrays when job description has zero keywords", () => {
    const result = calculateATSScore([], ["react", "node"], "Experienced developer");

    expect(result.score).toBe(0);
    expect(result.breakdown).toBeDefined();
    expect(result.breakdown.keywordMatch).toBe(0);
    expect(result.breakdown.resumeQuality).toBe(0);
    expect(result.breakdown.completeness).toBe(0);
    expect(result.breakdown.matched).toEqual([]);
    expect(result.breakdown.missing).toEqual([]);
  });

  it("should calculate matched and missing keywords when job description keywords are present", () => {
    const jdKeywords = ["react", "node", "typescript"];
    const resumeKeywords = ["react", "node"];
    const resumeText = "Experienced developer with React and Node skills and education in computer science.";

    const result = calculateATSScore(jdKeywords, resumeKeywords, resumeText);

    expect(result.breakdown.matched).toEqual(["react", "node"]);
    expect(result.breakdown.missing).toEqual(["typescript"]);
    expect(result.score).toBeGreaterThan(0);
  });
});
