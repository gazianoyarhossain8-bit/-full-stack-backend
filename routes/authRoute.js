import express from 'express';
import {resisterUser, loginUser } from '../controller/authController.js';


const router = express.Router()
router.post("/register", resisterUser)
router.post("/login", loginUser);

export default router;