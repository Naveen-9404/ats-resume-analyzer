import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../../src/app.js";
import User from "../../src/models/User.js";

describe("Auth API Integration", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "testsecret";
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a valid user", async () => {
      const res = await request(app).post("/api/v1/auth/register")
        .set("X-Forwarded-For", "1.1.1.1")
        .send({
        name: "Test User",
        email: "test@example.com",
        password: "Password123!"
      });
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Test User");
    });

    it("should reject registration with missing name", async () => {
      const res = await request(app).post("/api/v1/auth/register")
        .set("X-Forwarded-For", "1.1.1.2")
        .send({
        email: "test2@example.com",
        password: "Password123!"
      });
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should reject registration with invalid email", async () => {
      const res = await request(app).post("/api/v1/auth/register")
        .set("X-Forwarded-For", "1.1.1.3")
        .send({
        name: "Test User",
        email: "notanemail",
        password: "Password123!"
      });
      
      expect(res.status).toBe(400);
    });

    it("should reject registration with short password", async () => {
      const res = await request(app).post("/api/v1/auth/register")
        .set("X-Forwarded-For", "1.1.1.4")
        .send({
        name: "Test User",
        email: "test3@example.com",
        password: "short" // min is 8
      });
      
      expect(res.status).toBe(400);
    });

    it("should gracefully strip unexpected fields (Joi stripUnknown)", async () => {
      const res = await request(app).post("/api/v1/auth/register")
        .set("X-Forwarded-For", "1.1.1.5")
        .send({
        name: "Extra User",
        email: "extra@example.com",
        password: "Password123!",
        isAdmin: true
      });
      
      expect(res.status).toBe(201);
      const user = await User.findOne({ email: "extra@example.com" });
      expect(user).toBeDefined();
    });

    it("should reject duplicate email", async () => {
      await request(app).post("/api/v1/auth/register")
        .set("X-Forwarded-For", "1.1.1.6")
        .send({
        name: "Dup User",
        email: "dup@example.com",
        password: "Password123!"
      });
      
      const res = await request(app).post("/api/v1/auth/register")
        .set("X-Forwarded-For", "1.1.1.7")
        .send({
        name: "Dup User",
        email: "dup@example.com",
        password: "Password123!"
      });
      
      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeAll(async () => {
      await request(app).post("/api/v1/auth/register")
        .set("X-Forwarded-For", "1.1.1.8")
        .send({
        name: "Login User",
        email: "login@example.com",
        password: "ValidPassword123!"
      });
    });

    it("should login with valid credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login")
        .set("X-Forwarded-For", "1.1.1.9")
        .send({
        email: "login@example.com",
        password: "ValidPassword123!"
      });
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
    });

    it("should reject invalid credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login")
        .set("X-Forwarded-For", "1.1.1.10")
        .send({
        email: "login@example.com",
        password: "WrongPassword!"
      });
      
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should reject missing email", async () => {
      const res = await request(app).post("/api/v1/auth/login")
        .set("X-Forwarded-For", "1.1.1.11")
        .send({
        password: "ValidPassword123!"
      });
      
      expect(res.status).toBe(400);
    });

    it("should reject missing password", async () => {
      const res = await request(app).post("/api/v1/auth/login")
        .set("X-Forwarded-For", "1.1.1.12")
        .send({
        email: "login@example.com",
      });
      
      expect(res.status).toBe(400);
    });
  });
});
