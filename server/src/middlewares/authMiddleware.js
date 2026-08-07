import jwt from "jsonwebtoken";

import env from "../config/env.js";
import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";
import asyncHandler from "./asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access denied. No token provided.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "User not found.");
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token.");
  }
});

export default authMiddleware;