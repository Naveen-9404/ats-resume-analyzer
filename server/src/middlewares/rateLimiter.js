import rateLimit from "express-rate-limit";

// General API Rate Limiter
// Protects the general API from spam, allowing 100 requests per 15 minutes.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Authentication Limiter (Strict)
// Prevents brute-force login attacks and mass account registration.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per IP
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Analyze Endpoint Limiter (Very Strict)
// The /analyze endpoint is computationally expensive (single-threaded PDF parsing)
// and uses external AI resources. We restrict this to 15 analyses per hour.
export const analyzeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15,
  message: {
    success: false,
    message: "Resume analysis limit reached (15 per hour). Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
