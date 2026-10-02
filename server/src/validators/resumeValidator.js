import Joi from "joi";

export const uploadResumeSchema = Joi.object({
  fileName: Joi.string().max(255).required(),
  
  resumeText: Joi.string().max(200000).required(),
  
  jobDescription: Joi.string().max(100000).required(),
  
  preview: Joi.string().allow("").max(2000).optional(),
  
  candidate: Joi.object({
    name: Joi.string().allow("").max(255).optional(),
    email: Joi.string().allow("").max(255).optional(),
    phone: Joi.string().allow("").max(100).optional(),
    linkedin: Joi.string().allow("").max(255).optional(),
    github: Joi.string().allow("").max(255).optional(),
    portfolio: Joi.string().allow("").max(255).optional(),
    location: Joi.string().allow("").max(255).optional(),
  }).optional(),

  atsScore: Joi.number().min(0).max(100).required(),
  
  careerReadiness: Joi.number().min(0).max(100).optional(),

  breakdown: Joi.object({
    resumeQuality: Joi.number().min(0).max(100).optional(),
    keywordMatch: Joi.number().min(0).max(100).optional(),
    skillsMatch: Joi.number().min(0).max(100).optional(),
    formatting: Joi.number().min(0).max(100).optional(),
  }).optional(),

  matched: Joi.array().items(Joi.string().max(200)).optional(),
  missing: Joi.array().items(Joi.string().max(200)).optional(),
  
  summary: Joi.string().allow("").max(10000).optional(),
  
  strengths: Joi.array().items(Joi.string().max(2000)).optional(),
  improvements: Joi.array().items(Joi.string().max(2000)).optional(),
  recommendations: Joi.array().items(Joi.string().max(2000)).optional(),
  interviewQuestions: Joi.array().items(Joi.string().max(2000)).optional(),

  recruiterVerdict: Joi.object({
    rating: Joi.string().allow("").max(255).optional(),
    reason: Joi.string().allow("").max(10000).optional(),
  }).optional(),
});
