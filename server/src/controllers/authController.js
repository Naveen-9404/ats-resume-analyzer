import jwt from "jsonwebtoken";

import User from "../models/User.js";
import env from "../config/env.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @desc Register User
 * @route POST /auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User registered successfully",
        {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      )
    );
});

/**
 * @desc Login User
 * @route POST /auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid =
    await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    env.jwtSecret,
    {
      expiresIn: "7d",
    }
  );

  res.json(
    new ApiResponse(
      200,
      "Login successful",
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      }
    )
  );
});