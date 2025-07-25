import express from 'express';
import {
  getQuestionsBySubject,
  getQuestionById,
} from '../controllers/questionController.js';

const router = express.Router();

router.get('/question/:id', getQuestionById);                    
router.get('/:subjectId', getQuestionsBySubject);               
export default router;
