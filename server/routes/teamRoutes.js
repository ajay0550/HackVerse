import express from "express";
import {
    createTeam,
    leaveTeam,
    deleteTeam,
    getAllTeams,
    getTeamById,
    getMyTeams,
    getHackathonTeams,
} from "../controllers/teamController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTeam);
router.post("/:id/leave", authMiddleware, leaveTeam);
router.delete("/:id", authMiddleware, deleteTeam);

router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.get("/my", authMiddleware, getMyTeams);
router.get("/hackathon/:id", getHackathonTeams);

export default router;