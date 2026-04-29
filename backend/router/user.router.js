import express from "express";
import { getCurrentUser, getUserById, getUsers } from "../controllers/user.controller.js";
import { validateObjectId } from "../middleware/validators.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.get("/user/me", authMiddleware, getCurrentUser);
router.get("/users", getUsers, validateObjectId);
router.get("/users/:id", getUserById, validateObjectId);

export default router;  
































































