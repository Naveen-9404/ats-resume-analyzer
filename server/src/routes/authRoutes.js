import express from "express";
import {
  register,
  login,
} from "../controllers/authController.js";

import { authLimiter } from "../middlewares/rateLimiter.js";
import validateRequest from "../validators/validateRequest.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth router works!"
  });
});

// Apply strict rate limiting to auth routes
router.use(authLimiter);

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);

export default router;