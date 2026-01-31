import express from 'express';
const router = express.Router()

import {getUser, createUser, update, userDelete} from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';


router.get("/users",protect, getUser);
router.post("/users",createUser);
router.put("/users/:id", update)
router.delete("/users/:id", userDelete)

export default router;