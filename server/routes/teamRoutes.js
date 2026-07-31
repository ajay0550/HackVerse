import express from "express";
import { createTeam,joinTeam,leaveTeam,deleteTeam,getAllTeams,getTeamById } from "../controllers/teamController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", authMiddleware, createTeam);
router.post("/:id/join", authMiddleware, joinTeam);
router.post("/:id/leave", authMiddleware, leaveTeam);
router.delete("/:id", authMiddleware, deleteTeam);
router.get("/", getAllTeams);
router.get("/:id", getTeamById);




export default router;