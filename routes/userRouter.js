import express from 'express';
const router = express.Router()

import {getUser, createUser, update, userDelete} from '../controller/userController.js';
import {upload } from '../controller/multerController.js';



router.get("/users", getUser);
router.post("/users",createUser);
router.put("/users/:id", update)
router.delete("/users/:id", userDelete)
router.post("/users", upload.single('avatar'))

export default router;