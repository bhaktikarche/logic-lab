import express from 'express';
import { getAllSubjects } from '../controllers/subjectController.js';

const router = express.Router();

router.get('/', getAllSubjects);

export default router;
