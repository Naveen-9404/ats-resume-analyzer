import { describe, it, expect } from "vitest";
import { normalizeAIResponse } from "../../src/utils/aiAnalyzer.js";

describe("AI Response Normalization", () => {
  it("should normalize a valid AI response", () => {
    const rawResponse = {
      candidate: { name: "John Doe" },
      summary: "Great candidate",
      atsScore: 85,
    };
    
    const result = normalizeAIResponse(rawResponse);

    expect(result.candidate.name).toBe("John Doe");
    expect(result.summary).toBe("Great candidate");
    expect(result.atsScore).toBe(85);
  });

  it("should handle missing optional fields and malformed values", () => {
    const rawResponse = {
      atsScore: "150", // Out of bounds
      breakdown: { resumeQuality: -10 } // Out of bounds
    };
    
    const result = normalizeAIResponse(rawResponse);

    expect(result.candidate.name).toBe(""); // normalized to string
    expect(result.atsScore).toBe(100); // Clamped
    expect(result.breakdown.resumeQuality).toBe(0); // Clamped
    expect(result.matchedSkills).toEqual([]); // Normalized to empty array
  });

  it("should normalize nested recruiter verdict", () => {
    const rawResponse = {
      recruiterVerdict: {
        rating: "Strong Hire",
        reason: null
      }
    };
    
    const result = normalizeAIResponse(rawResponse);

    expect(result.recruiterVerdict.rating).toBe("Strong Hire");
    expect(result.recruiterVerdict.reason).toBe("No recruiter comments available.");
  });
});
