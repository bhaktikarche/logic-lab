import express from "express";
import { getUserStats } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:id/stats", authenticateUser, getUserStats);

export default router;
