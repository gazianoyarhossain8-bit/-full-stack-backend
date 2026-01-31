import express from 'express';
import {resisterUser, loginUser } from '../controller/authController.js';
import  protect from '../middleware/authMiddleware.js';

const router = express.Router()
router.post("/register", resisterUser)
router.post("/login", loginUser);
router.get("/profile",protect,(req, res) =>{
    res.status(200).json({
        message: "protected data",
        user: req.user
    });
});

export default router;