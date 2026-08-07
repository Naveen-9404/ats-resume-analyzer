import express from "express";
import multer from "multer";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  uploadResume,
  analyzeResume,
  getHistory,
  deleteResume,
} from "../controllers/resumeController.js";

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
  upload.single("resume"),
  analyzeResume
);

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
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
