import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import app from "../../src/app.js";
import User from "../../src/models/User.js";
import * as aiAnalyzer from "../../src/utils/aiAnalyzer.js";

describe("Resume API Integration", () => {
  let token;
  let userId;
  let otherUserId;
  let otherToken;

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

  describe("POST /api/v1/resume/upload (Save Analysis)", () => {
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
});
