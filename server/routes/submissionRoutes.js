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


router.post(
  "/",
  authMiddleware,
  createSubmission
);


router.get(
  "/",
  getAllSubmissions
);

router.get(
  "/hackathon/:hackathonId",
  authMiddleware,
  getHackathonSubmissions
);


router.get(
  "/hackathon/:hackathonId/leaderboard",
  getHackathonLeaderboard
);

router.put(
  "/:id/judge",
  authMiddleware,
  judgeSubmission
);


router.get(
  "/:id",
  getSubmissionById
);


router.put(
  "/:id",
  authMiddleware,
  updateSubmission
);


export default router;