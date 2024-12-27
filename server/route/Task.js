import express from 'express';
import { getAllTasks, getAllTasksByProjectId, createTask, getAllAuth, updateTaskStatus } from "../controller/Task.js";

const router= express.Router();

router.get('/auth',getAllAuth);
router.get("/", getAllTasks);
router.get('/:id', getAllTasksByProjectId);
router.post('/', createTask);
router.patch('/:id',updateTaskStatus);


export default router;
