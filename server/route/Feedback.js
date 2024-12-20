import express from 'express';
import { createFeedback, deleteFeedback, upVote, getAllFeedback } from '../controller/Feedback.js';
import multer from 'multer';




const router= express.Router();

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
      cb(null,"uploads/");
    },
    filename:(req, file, cb)=>{
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9);
        cb(null, uniqueSuffix+ "-"+file.originalname);
    },
});

const upload=multer({storage});


router.get('/',getAllFeedback);
router.post('/',upload.single('attachment'),createFeedback)
router.delete('/:id',deleteFeedback);
router.put('/:id/vote', upVote);

export default router;