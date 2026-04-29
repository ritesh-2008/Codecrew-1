import express from "express";
import { register,  login } from "../controllers/auth.controller.js";
import { authLimiter } from "../config/limiter.js";
import { validateLogin,validateRegistration } from "../middleware/validators.js";
const router = express.Router();

router.post("/register", authLimiter, validateRegistration, register);

router.post("/login", authLimiter, validateLogin, login);
export default router;