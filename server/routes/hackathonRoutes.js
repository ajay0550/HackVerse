import express from "express";

import {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
  getMyHackathons,
} from "../controllers/hackathonController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Create hackathon
router.post(
  "/",
  authMiddleware,
  createHackathon
);


// Get hackathons created by logged-in organizer
// MUST be before /:id
router.get(
  "/my",
  authMiddleware,
  getMyHackathons
);


// Get all hackathons
router.get(
  "/",
  getAllHackathons
);


// Get single hackathon
router.get(
  "/:id",
  getHackathonById
);


// Update hackathon
router.put(
  "/:id",
  authMiddleware,
  updateHackathon
);


// Delete hackathon
router.delete(
  "/:id",
  authMiddleware,
  deleteHackathon
);


export default router;