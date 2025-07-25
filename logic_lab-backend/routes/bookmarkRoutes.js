import express from 'express';
import {
  getBookmarks,
  removeBookmark,
  getBookmarkStatus,
} from '../controllers/bookmarkController.js';
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', getBookmarks); 
router.delete('/', removeBookmark); 
router.get("/:id/bookmark-status", authenticateUser, getBookmarkStatus);export default router;
