import express from 'express';
import { createFeedback, getAllFeedback } from '../controller/Feedback.js';


const router= express.Router();

router.get('/',getAllFeedback);
router.post('/',createFeedback)

export default router;