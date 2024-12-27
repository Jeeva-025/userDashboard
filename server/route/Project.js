import express from "express";
import { getAllProjects, createProject, updateProjectStatus, updateProject } from "../controller/Project.js";


const router= express.Router();

router.get("/", getAllProjects);
router.post("/", createProject );
router.patch('/:id', updateProjectStatus);
router.put("/:id",updateProject );

export default router;


