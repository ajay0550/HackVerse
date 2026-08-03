import express from "express";
import {
    createSubmission,
    getAllSubmissions,
    getSubmissionById,
    updateSubmission,
} from "../controllers/submissionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createSubmission);

router.get("/", getAllSubmissions);
router.get("/:id", getSubmissionById);

router.put("/:id", authMiddleware, updateSubmission);

export default router;