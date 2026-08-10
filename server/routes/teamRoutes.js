import express from "express";

import {
  createTeam,
  joinTeam,
  sendJoinRequest,
  getJoinRequests,
  acceptJoinRequest,
  rejectJoinRequest,
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
 
router.get("/my", authMiddleware, getMyTeams);

 
router.get("/hackathon/:id", getHackathonTeams);

 
router.get("/", getAllTeams);

 
router.post("/:id/request", authMiddleware, sendJoinRequest);

 
router.get("/:id/requests", authMiddleware, getJoinRequests);

 
router.post(
  "/:id/requests/:requestId/accept",
  authMiddleware,
  acceptJoinRequest
);
 
router.post(
  "/:id/requests/:requestId/reject",
  authMiddleware,
  rejectJoinRequest
);

 
router.post("/:id/join", authMiddleware, joinTeam);
 
router.post("/:id/leave", authMiddleware, leaveTeam);

 
router.delete("/:id", authMiddleware, deleteTeam);
 
router.get("/:id", getTeamById);
 
export default router;