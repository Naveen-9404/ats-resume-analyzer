import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import app from "../../src/app.js";
import User from "../../src/models/User.js";
import * as aiAnalyzer from "../../src/utils/aiAnalyzer.js";
import { authLimiter } from "../../src/middlewares/rateLimiter.js";
import * as resumeParser from "../../src/utils/resumeParser.js";

describe("Resume API Integration", () => {
  let token;
  let userId;
  let otherUserId;
  let otherToken;

  describe("POST /api/v1/resume/upload (Save Analysis)", () => {
  beforeEach(async () => {
    process.env.JWT_SECRET = "testsecret";
    
    // Register User 1
    await request(app).post("/api/v1/auth/register")
      .set("X-Forwarded-For", "1.1.2.1")
      .send({
      name: "Resume User 1",
      email: "resume1@example.com",
      password: "Password123!"
    });
    
    // Login User 1 to get token
    const res1 = await request(app).post("/api/v1/auth/login")
      .set("X-Forwarded-For", "1.1.2.2")
      .send({
      email: "resume1@example.com",
      password: "Password123!"
    });
    token = res1.body.data.token;
    userId = res1.body.data.user.id;
    
    // Register User 2 (for spoofing test)
    await request(app).post("/api/v1/auth/register")
      .set("X-Forwarded-For", "1.1.2.3")
      .send({
      name: "Resume User 2",
      email: "resume2@example.com",
      password: "Password123!"
    });
    
    // Login User 2
    const res2 = await request(app).post("/api/v1/auth/login")
      .set("X-Forwarded-For", "1.1.2.4")
      .send({
      email: "resume2@example.com",
      password: "Password123!"
    });
    otherToken = res2.body.data.token;
    otherUserId = res2.body.data.user.id;
  });
    const validPayload = {
      fileName: "test.pdf",
      resumeText: "Test Resume Content",
      jobDescription: "Test Job Description",
      atsScore: 80,
      breakdown: { resumeQuality: 80, keywordMatch: 80, skillsMatch: 80, formatting: 80 },
      matched: ["react"],
      missing: ["node"],
      summary: "Good resume"
    };

    it("should reject unauthenticated request", async () => {
      const res = await request(app).post("/api/v1/resume/upload")
        .set("X-Forwarded-For", "1.1.2.5")
        .send(validPayload);
      expect(res.status).toBe(401); // Unauthorized
    });

    it("should return 400 if resumeText is missing", async () => {
      const { resumeText, ...invalidPayload } = validPayload;
      
      const res = await request(app)
        .post("/api/v1/resume/upload")
        .set("X-Forwarded-For", "1.1.2.6")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidPayload);
        
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should successfully save a valid analysis and NOT trigger AI/ATS", async () => {
      const aiSpy = vi.spyOn(aiAnalyzer, 'getAISuggestions');
      
      const res = await request(app)
        .post("/api/v1/resume/upload")
        .set("X-Forwarded-For", "1.1.2.7")
        .set("Authorization", `Bearer ${token}`)
        .send(validPayload);
        
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.fileName).toBe("test.pdf");
      expect(res.body.data.atsScore).toBe(80);
      
      // Critical: Ensure AI was NOT triggered
      expect(aiSpy).not.toHaveBeenCalled();
      aiSpy.mockRestore();
    });

    it("should not allow client to spoof user ID", async () => {
      // User 1 tries to save analysis assigned to User 2
      const maliciousPayload = { ...validPayload, user: otherUserId };
      
      const res = await request(app)
        .post("/api/v1/resume/upload")
        .set("X-Forwarded-For", "1.1.2.8")
        .set("Authorization", `Bearer ${token}`)
        .send(maliciousPayload);
        
      expect(res.status).toBe(201);
      // Ensure it was stripped (user is still User 1)
      const Resume = (await import("../../src/models/Resume.js")).default;
      const saved = await Resume.findById(res.body.data.id);
      expect(saved.user.toString()).toBe(userId);
    });

    it("should return 400 for invalid field types", async () => {
      const invalidTypePayload = { ...validPayload, atsScore: "not-a-number" };
      
      const res = await request(app)
        .post("/api/v1/resume/upload")
        .set("X-Forwarded-For", "1.1.2.9")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidTypePayload);
        
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });

    it("should gracefully strip unexpected fields (Joi stripUnknown)", async () => {
      const payloadWithExtras = { ...validPayload, superSecretAdminAccess: true };
      
      const res = await request(app)
        .post("/api/v1/resume/upload")
        .set("X-Forwarded-For", "1.1.2.10")
        .set("Authorization", `Bearer ${token}`)
        .send(payloadWithExtras);
        
      expect(res.status).toBe(201);
      expect(res.body.data.superSecretAdminAccess).toBeUndefined();
    });
  });

  describe("POST /api/v1/resume/analyze", () => {
    const resumeTextSample =
      "Experienced Software Engineer with strong background in React, Node, and Express. Experience in building scalable applications. Education in Computer Science. Projects with MongoDB. Skills: React, Node, Express, MongoDB.";

    const jobDescriptionSample =
      "We are looking for a Senior Developer with experience in React, Node, Python, and SQL.";

    it("should return 400 if resume file is missing", async () => {
      const res = await request(app)
        .post("/api/v1/resume/analyze")
        .set("X-Forwarded-For", "1.1.3.1")
        .field("jobDescription", jobDescriptionSample);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("upload a resume");
    });

    it("should return 400 if jobDescription is missing", async () => {
      const res = await request(app)
        .post("/api/v1/resume/analyze")
        .set("X-Forwarded-For", "1.1.3.2")
        .attach("resume", Buffer.from("%PDF-1.4 dummy"), {
          filename: "resume.pdf",
          contentType: "application/pdf",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Job description is required");
    });

    it("should preserve real local ATS scores and keyword arrays when AI fails", async () => {
      const parseSpy = vi.spyOn(resumeParser, "parseResume").mockResolvedValue(resumeTextSample);
      const aiSpy = vi.spyOn(aiAnalyzer, "getAISuggestions").mockResolvedValue({
        isFallback: true,
        summary: "AI analysis is temporarily unavailable. VectorCV generated a fallback analysis using the ATS engine.",
        atsScore: null,
        careerReadiness: null,
        breakdown: null,
        matchedSkills: null,
        missingSkills: null,
        recommendations: ["Tailor resume for the role"],
        recruiterVerdict: { rating: "Average Match", reason: "AI service was unavailable." },
      });

      const res = await request(app)
        .post("/api/v1/resume/analyze")
        .set("X-Forwarded-For", "1.1.3.3")
        .attach("resume", Buffer.from("%PDF-1.4 dummy"), {
          filename: "resume.pdf",
          contentType: "application/pdf",
        })
        .field("jobDescription", jobDescriptionSample);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isFallback).toBe(true);

      // Real local ATS score is preserved (NOT 60)
      expect(res.body.data.atsScore).toBeGreaterThan(0);
      expect(res.body.data.atsScore).not.toBe(60);

      // Real matched and missing keywords are preserved
      expect(res.body.data.matched).toEqual(expect.arrayContaining(["node", "react"]));
      expect(res.body.data.missing).toEqual(expect.arrayContaining(["python", "sql"]));

      // Real breakdown is derived from local metrics
      expect(res.body.data.breakdown.keywordMatch).toBe(50); // 2 matched out of 4 JD keywords (react, node vs python, sql)
      expect(res.body.data.breakdown.skillsMatch).toBe(50);
      expect(res.body.data.breakdown.resumeQuality).toBeGreaterThan(0);

      parseSpy.mockRestore();
      aiSpy.mockRestore();
    });

    it("should use AI scores and findings when AI succeeds", async () => {
      const parseSpy = vi.spyOn(resumeParser, "parseResume").mockResolvedValue(resumeTextSample);
      const aiSpy = vi.spyOn(aiAnalyzer, "getAISuggestions").mockResolvedValue({
        candidate: { name: "Jane Developer", email: "jane@example.com" },
        summary: "Excellent senior engineering candidate with strong frontend and backend skills.",
        atsScore: 92,
        careerReadiness: 94,
        breakdown: { resumeQuality: 90, keywordMatch: 95, skillsMatch: 92, formatting: 90 },
        matchedSkills: ["react", "node"],
        missingSkills: ["python"],
        recommendations: ["Add system architecture details"],
        recruiterVerdict: { rating: "Strong Match", reason: "High alignment with requirements." },
        isFallback: false,
      });

      const res = await request(app)
        .post("/api/v1/resume/analyze")
        .set("X-Forwarded-For", "1.1.3.4")
        .attach("resume", Buffer.from("%PDF-1.4 dummy"), {
          filename: "resume.pdf",
          contentType: "application/pdf",
        })
        .field("jobDescription", jobDescriptionSample);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isFallback).toBe(false);
      expect(res.body.data.atsScore).toBe(92);
      expect(res.body.data.careerReadiness).toBe(94);
      expect(res.body.data.candidate.name).toBe("Jane Developer");
      expect(res.body.data.matched).toEqual(["react", "node"]);
      expect(res.body.data.missing).toEqual(["python"]);
      expect(res.body.data.summary).toContain("Excellent senior engineering candidate");

      parseSpy.mockRestore();
      aiSpy.mockRestore();
    });

    it("should never let empty AI arrays override non-empty local ATS arrays", async () => {
      const parseSpy = vi.spyOn(resumeParser, "parseResume").mockResolvedValue(resumeTextSample);
      const aiSpy = vi.spyOn(aiAnalyzer, "getAISuggestions").mockResolvedValue({
        atsScore: 88,
        careerReadiness: 85,
        breakdown: { resumeQuality: 85, keywordMatch: 85, skillsMatch: 85, formatting: 85 },
        matchedSkills: [], // Empty AI array
        missingSkills: [], // Empty AI array
        summary: "Good profile.",
        recruiterVerdict: { rating: "Good Match", reason: "Solid skills." },
        isFallback: false,
      });

      const res = await request(app)
        .post("/api/v1/resume/analyze")
        .set("X-Forwarded-For", "1.1.3.5")
        .attach("resume", Buffer.from("%PDF-1.4 dummy"), {
          filename: "resume.pdf",
          contentType: "application/pdf",
        })
        .field("jobDescription", jobDescriptionSample);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      // Even though AI returned [], local ATS skills are preserved!
      expect(res.body.data.matched).toEqual(expect.arrayContaining(["node", "react"]));
      expect(res.body.data.missing).toEqual(expect.arrayContaining(["python", "sql"]));

      parseSpy.mockRestore();
      aiSpy.mockRestore();
    });
  });
});

