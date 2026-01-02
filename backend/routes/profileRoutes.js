import express from "express";
import { getProfile, updateProfile } from "../controller/profileController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);

export default router;
