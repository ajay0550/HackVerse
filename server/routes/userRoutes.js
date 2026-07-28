import express from "express";
import { signup, login, getProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/test", authMiddleware, (req,res)=>{
    res.json({
        message: "You reached the protected route!"
    });
});

router.get("/profile", authMiddleware, getProfile);


export default router; 