import express from "express";
import multer from "multer";

import authMiddleware from "../middlewares/authMiddleware.js";

import { analyzeLimiter } from "../middlewares/rateLimiter.js";
import {
  uploadResume,
  analyzeResume,
  getHistory,
  deleteResume,
} from "../controllers/resumeController.js";

import validateRequest from "../validators/validateRequest.js";
import { uploadResumeSchema } from "../validators/resumeValidator.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Multer Configuration                           */
/* -------------------------------------------------------------------------- */

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed."), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

/* -------------------------------------------------------------------------- */
/*                               Resume Routes                                */
/* -------------------------------------------------------------------------- */

router.post(
  "/analyze",
  analyzeLimiter,
  upload.single("resume"),
  analyzeResume
);

router.post(
  "/upload",
  authMiddleware,
  validateRequest(uploadResumeSchema),
  uploadResume
);

router.get(
  "/history",
  authMiddleware,
  getHistory
);

router.delete(
  "/:id",
  authMiddleware,
  deleteResume
);

export default router;




