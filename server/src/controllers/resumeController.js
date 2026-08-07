import Resume from "../models/Resume.js";

import { parseResume } from "../utils/resumeParser.js";
import { extractKeywords } from "../utils/keywordExtractor.js";
import { calculateATSScore } from "../utils/atsScore.js";
import { getAISuggestions } from "../utils/aiAnalyzer.js";

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

  const atsResult = calculateATSScore(
    extractKeywords(jobDescription),
    extractKeywords(resumeText),
    resumeText
  );

  /* --------------------------- AI Intelligence --------------------------- */

  const ai =
    await getAISuggestions(
      resumeText,
      jobDescription
    );

  /* ---------------------------- Final Object ----------------------------- */

  return {
    fileName: file.originalname,

    resumeText,

    preview: resumeText.slice(0, 500),

    candidate:
      ai.candidate ??
      EMPTY_CANDIDATE,

    atsScore:
      ai.atsScore ??
      atsResult.score,

    careerReadiness:
      ai.careerReadiness ?? 0,

    breakdown:
      ai.breakdown ??
      EMPTY_BREAKDOWN,

    matched:
      ai.matchedSkills ??
      atsResult.breakdown.matched ??
      [],

    missing:
      ai.missingSkills ??
      atsResult.breakdown.missing ??
      [],

    summary:
      ai.summary ?? "",

    strengths:
      ai.strengths ?? [],

    improvements:
      ai.improvements ?? [],

    recommendations:
      ai.recommendations ?? [],

    interviewQuestions:
      ai.interviewQuestions ?? [],

    recruiterVerdict:
      ai.recruiterVerdict ??
      EMPTY_VERDICT,
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

    // Never expose the complete resume text
    const {
      resumeText,
      ...response
    } = analysis;

    return res.status(200).json({
      success: true,

      message:
        "Resume analyzed successfully.",

      data: response,
    });
  } catch (error) {
    console.error(
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
    if (
      !validateAnalysisRequest(
        req,
        res
      )
    ) {
      return;
    }

    /* ---------------------------------------------------------------------- */
    /*                           Generate Analysis                            */
    /* ---------------------------------------------------------------------- */

    const analysis =
      await buildAnalysis(
        req.file,
        req.body.jobDescription
      );

    /* ---------------------------------------------------------------------- */
    /*                           Save to Database                             */
    /* ---------------------------------------------------------------------- */

    const savedResume =
      await Resume.create({
        user: req.user.id,

        fileName:
          analysis.fileName,

        resumeText:
          analysis.resumeText,

        preview:
          analysis.preview,

        jobDescription:
          req.body.jobDescription,

        candidate:
          analysis.candidate,

        atsScore:
          analysis.atsScore,

        careerReadiness:
          analysis.careerReadiness,

        breakdown:
          analysis.breakdown,

        matched:
          analysis.matched,

        missing:
          analysis.missing,

        summary:
          analysis.summary,

        strengths:
          analysis.strengths,

        improvements:
          analysis.improvements,

        recommendations:
          analysis.recommendations,

        interviewQuestions:
          analysis.interviewQuestions,

        recruiterVerdict:
          analysis.recruiterVerdict,
      });

    /* ---------------------------------------------------------------------- */
    /*                              API Response                              */
    /* ---------------------------------------------------------------------- */

    return res.status(201).json({
      success: true,

      message:
        "Resume analyzed and saved successfully.",

      data: {
        id: savedResume._id,

        fileName:
          savedResume.fileName,

        preview:
          savedResume.preview,

        candidate:
          savedResume.candidate,

        atsScore:
          savedResume.atsScore,

        careerReadiness:
          savedResume.careerReadiness,

        breakdown:
          savedResume.breakdown,

        matched:
          savedResume.matched,

        missing:
          savedResume.missing,

        summary:
          savedResume.summary,

        strengths:
          savedResume.strengths,

        improvements:
          savedResume.improvements,

        recommendations:
          savedResume.recommendations,

        interviewQuestions:
          savedResume.interviewQuestions,

        recruiterVerdict:
          savedResume.recruiterVerdict,

        createdAt:
          savedResume.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Upload Resume Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to save resume analysis.",

      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
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
    console.error("Get History Error:", error);

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
    console.error("Delete Resume Error:", error);

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