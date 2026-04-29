import express from "express";
import { createProject, getProjects, getProjectById ,joinProject} from "../controllers/project.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/createprojects", authMiddleware, createProject);
router.get("/getprojects", authMiddleware, getProjects);
router.get("/projects/:id", authMiddleware, getProjectById);
router.post("/projects/:id/join", authMiddleware, joinProject);

export default router;