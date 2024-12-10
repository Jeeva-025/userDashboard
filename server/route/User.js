import express from "express";
import { getAllUsers, createUser, deleteUser, updateUser } from "../controller/User.js";
import {validateRequest} from '../middleware/verify.js';
import {createUserSchema, updateUserSchema} from '../validation.js'

const router= express.Router();

router.get('/',getAllUsers);
router.post('/',validateRequest(createUserSchema), createUser);
router.delete('/:id', deleteUser);
router.put('/:id',validateRequest(updateUserSchema), updateUser);


export default router;