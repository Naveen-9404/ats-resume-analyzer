import mongoose from "mongoose";

/* -------------------------------------------------------------------------- */
/*                            Candidate Schema                                */
/* -------------------------------------------------------------------------- */

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    github: {
      type: String,
      default: "",
      trim: true,
    },

    portfolio: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* -------------------------------------------------------------------------- */
/*                          Recruiter Verdict Schema                          */
/* -------------------------------------------------------------------------- */

const recruiterVerdictSchema = new mongoose.Schema(
  {
    rating: {
      type: String,
      default: "",
    },

    reason: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

/* -------------------------------------------------------------------------- */
/*                           Breakdown Schema                                 */
/* -------------------------------------------------------------------------- */

const breakdownSchema = new mongoose.Schema(
  {
    resumeQuality: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    keywordMatch: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    skillsMatch: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    formatting: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    _id: false,
  }
);

/* -------------------------------------------------------------------------- */
/*                              Resume Schema                                 */
/* -------------------------------------------------------------------------- */

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    preview: {
      type: String,
      default: "",
    },

    jobDescription: {
      type: String,
      required: true,
    },

    candidate: {
      type: candidateSchema,
      default: () => ({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        portfolio: "",
        location: "",
      }),
    },

    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    careerReadiness: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    breakdown: {
      type: breakdownSchema,
      default: () => ({
        resumeQuality: 0,
        keywordMatch: 0,
        skillsMatch: 0,
        formatting: 0,
      }),
    },

    matched: {
      type: [String],
      default: [],
    },

    missing: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    improvements: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    interviewQuestions: {
      type: [String],
      default: [],
    },

    recruiterVerdict: {
      type: recruiterVerdictSchema,
      default: () => ({
        rating: "",
        reason: "",
      }),
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
/*                                Indexes                                     */
/* -------------------------------------------------------------------------- */

resumeSchema.index({
  user: 1,
  createdAt: -1,
});

/* -------------------------------------------------------------------------- */
/*                                Model                                       */
/* -------------------------------------------------------------------------- */

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;