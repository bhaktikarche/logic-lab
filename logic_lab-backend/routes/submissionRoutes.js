import express from "express";
import { submitCode, getSubmissionsByUser } from "../controllers/submissionController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:questionId", authenticateUser, submitCode);
router.get("/", authenticateUser, getSubmissionsByUser);
export default router;
