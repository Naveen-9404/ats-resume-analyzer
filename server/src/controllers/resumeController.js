import Resume from "../models/Resume.js";

import { parseResume } from "../utils/resumeParser.js";
import { extractKeywords } from "../utils/keywordExtractor.js";
import { calculateATSScore } from "../utils/atsScore.js";
import { getAISuggestions } from "../utils/aiAnalyzer.js";
import logger from "../config/logger.js";

/* -------------------------------------------------------------------------- */
/*                             Default Objects                                */
/* -------------------------------------------------------------------------- */

const EMPTY_CANDIDATE = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
  location: "",
};

const EMPTY_BREAKDOWN = {
  resumeQuality: 0,
  keywordMatch: 0,
  skillsMatch: 0,
  formatting: 0,
};

const EMPTY_VERDICT = {
  rating: "Average Match",
  reason: "",
};

/* -------------------------------------------------------------------------- */
/*                          Build Resume Analysis                             */
/* -------------------------------------------------------------------------- */

const buildAnalysis = async (
  file,
  jobDescription
) => {
  /* ---------------------------- Parse Resume ----------------------------- */

  const resumeText = await parseResume(
    file.buffer
  );

  /* -------------------------- ATS Engine Score --------------------------- */

  const jdKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);

  const atsResult = calculateATSScore(
    jdKeywords,
    resumeKeywords,
    resumeText
  );

  /* --------------------------- AI Intelligence --------------------------- */

  let ai;
  try {
    ai = await getAISuggestions(
      resumeText,
      jobDescription
    );
  } catch (error) {
    logger.error("Unexpected AI analysis error", {
      message: error?.message || "Unknown error",
    });
    ai = {
      isFallback: true,
      summary:
        "AI analysis is temporarily unavailable. VectorCV generated a fallback analysis using the ATS engine.",
      recruiterVerdict: {
        rating: "Average Match",
        reason:
          "AI service was unavailable. This assessment is based on the ATS scoring engine.",
      },
    };
  }

  const isAIAvailable = Boolean(ai && !ai.isFallback && typeof ai.atsScore === "number");

  /* ----------------------- Local Breakdown Calculation ------------------- */

  const localMatched = Array.isArray(atsResult?.breakdown?.matched)
    ? atsResult.breakdown.matched
    : [];

  const localMissing = Array.isArray(atsResult?.breakdown?.missing)
    ? atsResult.breakdown.missing
    : [];

  const totalKeywords = localMatched.length + localMissing.length;

  const localKeywordPct = totalKeywords > 0
    ? Math.round((localMatched.length / totalKeywords) * 100)
    : 0;

  const localBreakdown = {
    resumeQuality: Math.min(100, Math.round(((atsResult?.breakdown?.resumeQuality || 0) / 20) * 100)),
    keywordMatch: localKeywordPct,
    skillsMatch: localKeywordPct,
    formatting: Math.min(100, Math.round(((atsResult?.breakdown?.completeness || 0) / 10) * 100)),
  };

  /* -------------------------- Merged Metrics ----------------------------- */

  const atsScore = isAIAvailable ? (ai.atsScore ?? atsResult.score) : atsResult.score;

  const breakdown = isAIAvailable && ai.breakdown
    ? ai.breakdown
    : localBreakdown;

  const careerReadiness =
    isAIAvailable && typeof ai.careerReadiness === "number"
      ? ai.careerReadiness
      : Math.min(
          100,
          Math.max(
            0,
            Math.round(
              atsScore * 0.45 +
                breakdown.resumeQuality * 0.2 +
                breakdown.skillsMatch * 0.2 +
                breakdown.formatting * 0.15
            )
          )
        );

  const matched =
    Array.isArray(ai?.matchedSkills) && ai.matchedSkills.length > 0
      ? ai.matchedSkills
      : localMatched;

  const missing =
    Array.isArray(ai?.missingSkills) && ai.missingSkills.length > 0
      ? ai.missingSkills
      : localMissing;

  /* ---------------------------- Final Object ----------------------------- */

  return {
    fileName: file.originalname,

    resumeText,

    preview: resumeText.slice(0, 500),

    candidate:
      ai?.candidate ??
      EMPTY_CANDIDATE,

    atsScore,

    careerReadiness,

    breakdown,

    matched,

    missing,

    summary:
      ai?.summary ?? "",

    strengths:
      ai?.strengths ?? [],

    improvements:
      ai?.improvements ?? [],

    recommendations:
      ai?.recommendations ?? [],

    interviewQuestions:
      ai?.interviewQuestions ?? [],

    recruiterVerdict:
      ai?.recruiterVerdict ??
      EMPTY_VERDICT,

    isFallback: !isAIAvailable,
  };
};

/* -------------------------------------------------------------------------- */
/*                           Request Validation                               */
/* -------------------------------------------------------------------------- */

const validateAnalysisRequest = (
  req,
  res
) => {
  const { file, body } = req;

  if (!file) {
    res.status(400).json({
      success: false,
      message: "Please upload a resume.",
    });

    return false;
  }

  if (
    !body.jobDescription ||
    !body.jobDescription.trim()
  ) {
    res.status(400).json({
      success: false,
      message:
        "Job description is required.",
    });

    return false;
  }

  return true;
};

/* -------------------------------------------------------------------------- */
/*                         Analyze Resume (Public)                            */
/* -------------------------------------------------------------------------- */

export const analyzeResume = async (
  req,
  res
) => {
  try {
    if (
      !validateAnalysisRequest(
        req,
        res
      )
    ) {
      return;
    }

    const analysis =
      await buildAnalysis(
        req.file,
        req.body.jobDescription
      );

    const response = analysis;

    return res.status(200).json({
      success: true,

      message:
        "Resume analyzed successfully.",

      data: response,
    });
  } catch (error) {
    logger.error(
      "Analyze Resume Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to analyze resume.",

      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};
/* -------------------------------------------------------------------------- */
/*                          Save Resume Analysis                              */
/* -------------------------------------------------------------------------- */

export const uploadResume = async (
  req,
  res
) => {
  try {
    const {
      fileName,
      resumeText,
      jobDescription,
      preview,
      candidate,
      atsScore,
      careerReadiness,
      breakdown,
      matched,
      missing,
      summary,
      strengths,
      improvements,
      recommendations,
      interviewQuestions,
      recruiterVerdict
    } = req.body;

    if (!fileName || !resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for saving analysis.",
      });
    }

    /* ---------------------------------------------------------------------- */
    /*                           Save to Database                             */
    /* ---------------------------------------------------------------------- */

    const savedResume =
      await Resume.create({
        user: req.user.id,
        fileName,
        resumeText,
        preview,
        jobDescription,
        candidate,
        atsScore,
        careerReadiness,
        breakdown,
        matched,
        missing,
        summary,
        strengths,
        improvements,
        recommendations,
        interviewQuestions,
        recruiterVerdict,
      });

    /* ---------------------------------------------------------------------- */
    /*                              API Response                              */
    /* ---------------------------------------------------------------------- */

    return res.status(201).json({
      success: true,
      message: "Resume analyzed and saved successfully.",
      data: {
        id: savedResume._id,
        fileName: savedResume.fileName,
        preview: savedResume.preview,
        candidate: savedResume.candidate,
        atsScore: savedResume.atsScore,
        careerReadiness: savedResume.careerReadiness,
        breakdown: savedResume.breakdown,
        matched: savedResume.matched,
        missing: savedResume.missing,
        summary: savedResume.summary,
        strengths: savedResume.strengths,
        improvements: savedResume.improvements,
        recommendations: savedResume.recommendations,
        interviewQuestions: savedResume.interviewQuestions,
        recruiterVerdict: savedResume.recruiterVerdict,
        createdAt: savedResume.createdAt,
      },
    });
  } catch (error) {
    logger.error("Upload Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save resume analysis.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
/* -------------------------------------------------------------------------- */
/*                           Get Resume History                               */
/* -------------------------------------------------------------------------- */

export const getHistory = async (req, res) => {
  try {
    const history = await Resume.find({
      user: req.user.id,
    })
      .sort({
        createdAt: -1,
      })
      .select("-resumeText");

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    logger.error("Get History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume history.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                           Delete Resume                                    */
/* -------------------------------------------------------------------------- */

export const deleteResume = async (req, res) => {
  try {
    const deletedResume =
      await Resume.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });

    if (!deletedResume) {
      return res.status(404).json({
        success: false,
        message: "Resume analysis not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume analysis deleted successfully.",
      deletedId: deletedResume._id,
    });
  } catch (error) {
    logger.error("Delete Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume analysis.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};