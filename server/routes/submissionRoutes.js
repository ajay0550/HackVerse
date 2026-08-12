import express from "express";

import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  judgeSubmission,
  getHackathonSubmissions,
  getHackathonLeaderboard,
} from "../controllers/submissionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Create submission
router.post(
  "/",
  authMiddleware,
  createSubmission
);


// Get all submissions
router.get(
  "/",
  getAllSubmissions
);


// Get submissions for a hackathon
router.get(
  "/hackathon/:hackathonId",
  authMiddleware,
  getHackathonSubmissions
);


// Get leaderboard for a hackathon
router.get(
  "/hackathon/:hackathonId/leaderboard",
  getHackathonLeaderboard
);


// Judge submission
router.put(
  "/:id/judge",
  authMiddleware,
  judgeSubmission
);


// Get submission by ID
router.get(
  "/:id",
  getSubmissionById
);


// Update submission
router.put(
  "/:id",
  authMiddleware,
  updateSubmission
);


export default router;