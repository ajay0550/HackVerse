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

router.post(
  "/",
  authMiddleware,
  createHackathon
);


router.get(
  "/my",
  authMiddleware,
  getMyHackathons
);

router.get(
  "/",
  getAllHackathons
);


router.get(
  "/:id",
  getHackathonById
);



router.put(
  "/:id",
  authMiddleware,
  updateHackathon
);



router.delete(
  "/:id",
  authMiddleware,
  deleteHackathon
);


export default router;