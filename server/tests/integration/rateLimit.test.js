import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Rate Limiter Integration", () => {
  it("should trigger HTTP 429 when auth rate limit is exceeded", async () => {
    let statusCode = 200;
    
    // Auth limiter allows 10 requests. We will make 11 to trigger it.
    for (let i = 0; i < 11; i++) {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "ratelimit@example.com",
        password: "Password123!"
      });
      
      if (res.status === 429) {
        statusCode = 429;
        break;
      }
    }
    
    expect(statusCode).toBe(429);
  });
});
