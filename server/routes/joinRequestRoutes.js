import express from "express";
import {
    createJoinRequest,
    getJoinRequests,
    acceptJoinRequest,
    rejectJoinRequest,
} from "../controllers/joinRequestController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/request", authMiddleware, createJoinRequest);
router.get("/", authMiddleware, getJoinRequests);

router.post("/:id/accept", authMiddleware, acceptJoinRequest);
router.post("/:id/reject", authMiddleware, rejectJoinRequest);

export default router;