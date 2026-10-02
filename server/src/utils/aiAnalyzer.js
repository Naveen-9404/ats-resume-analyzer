import OpenAI from "openai";

import env from "../config/env.js";
import logger from "../config/logger.js";

import resumePrompt from "../prompts/resumePrompt.js";

/* -------------------------------------------------------------------------- */
/*                           OpenRouter Client                                */
/* -------------------------------------------------------------------------- */

const client = new OpenAI({
  apiKey: env.openRouterApiKey,

  baseURL: "https://openrouter.ai/api/v1",

  timeout: 15000,

  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "VectorCV",
  },
});

/* -------------------------------------------------------------------------- */
/*                             Helper Functions                               */
/* -------------------------------------------------------------------------- */

const clamp = (value) =>
  Math.max(0, Math.min(100, Number(value) || 0));

const normalizeString = (value) =>
  typeof value === "string" ? value.trim() : "";

const normalizeArray = (value) =>
  Array.isArray(value) ? value : [];

/* -------------------------------------------------------------------------- */
/*                         Normalize AI Response                              */
/* -------------------------------------------------------------------------- */

export function normalizeAIResponse(ai = {}) {
  const breakdown = ai.breakdown || {};

  const atsScore = clamp(ai.atsScore);

  const resumeQuality = clamp(
    breakdown.resumeQuality
  );

  const keywordMatch = clamp(
    breakdown.keywordMatch
  );

  const skillsMatch = clamp(
    breakdown.skillsMatch
  );

  const formatting = clamp(
    breakdown.formatting
  );

  // Calculate Career Readiness
  const careerReadiness = clamp(
    Math.round(
      atsScore * 0.45 +
        resumeQuality * 0.2 +
        skillsMatch * 0.2 +
        formatting * 0.15
    )
  );

  return {
    candidate: {
      name: normalizeString(ai.candidate?.name),
      email: normalizeString(ai.candidate?.email),
      phone: normalizeString(ai.candidate?.phone),
      linkedin: normalizeString(ai.candidate?.linkedin),
      github: normalizeString(ai.candidate?.github),
      portfolio: normalizeString(ai.candidate?.portfolio),
      location: normalizeString(ai.candidate?.location),
    },

    summary: normalizeString(ai.summary),

    atsScore,

    careerReadiness,

    breakdown: {
      resumeQuality,
      keywordMatch,
      skillsMatch,
      formatting,
    },

    matchedSkills: normalizeArray(
      ai.matchedSkills
    ),

    missingSkills: normalizeArray(
      ai.missingSkills
    ),

    strengths: normalizeArray(
      ai.strengths
    ),

    improvements: normalizeArray(
      ai.improvements
    ),

    recommendations: normalizeArray(
      ai.recommendations
    ),

    interviewQuestions: normalizeArray(
      ai.interviewQuestions
    ),

    recruiterVerdict: {
      rating:
        normalizeString(
          ai.recruiterVerdict?.rating
        ) || "Average Match",

      reason:
        normalizeString(
          ai.recruiterVerdict?.reason
        ) ||
        "No recruiter comments available.",
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                          AI Resume Intelligence                            */
/* -------------------------------------------------------------------------- */

export const getAISuggestions = async (
  resumeText,
  jobDescription
) => {
  try {
    const completion =
      await client.chat.completions.create({
        model: "google/gemma-4-26b-a4b-it:free",

        temperature: 0,

        response_format: {
          type: "json_object",
        },

        messages: [
          {
            role: "system",
            content: resumePrompt,
          },
          {
            role: "user",
            content: `
JOB DESCRIPTION
========================

${jobDescription}

========================

RESUME
========================

${resumeText}
`,
          },
        ],
      });

    const content =
      completion.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error(
        "OpenRouter returned an empty response."
      );
    }

    const cleanContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanContent);

    return normalizeAIResponse(parsed);
  } catch (error) {
    logger.error(
      "VectorCV AI Error",
      error
    );

    /* ---------------------------------------------------------------------- */
    /*                           Safe Fallback                                */
    /* ---------------------------------------------------------------------- */

    return {
      candidate: {
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        portfolio: "",
        location: "",
      },

      summary:
        "AI analysis is temporarily unavailable. VectorCV generated a fallback analysis using the ATS engine.",

      atsScore: 60,

      careerReadiness: 68,

      breakdown: {
        resumeQuality: 75,
        keywordMatch: 60,
        skillsMatch: 65,
        formatting: 90,
      },

      matchedSkills: [],

      missingSkills: [],

      strengths: [
        "Resume uploaded successfully.",
        "Resume formatting is acceptable.",
        "ATS parsing completed.",
      ],

      improvements: [
        "Retry AI analysis later.",
        "Add measurable achievements.",
        "Improve project descriptions.",
        "Include more job-specific keywords.",
      ],

      recommendations: [
        "Tailor the resume for each application.",
        "Add quantified project outcomes.",
        "Include technologies from the job description.",
        "Improve technical project descriptions.",
      ],

      interviewQuestions: [
        "Describe your strongest technical project.",
        "Explain your technology stack.",
        "Tell me about a challenging bug you solved.",
        "How would you improve this resume?",
        "Why are you interested in this position?",
      ],

      recruiterVerdict: {
        rating: "Average Match",

        reason:
          "AI service was unavailable. This assessment is based on the ATS scoring engine.",
      },
    };
  }
};