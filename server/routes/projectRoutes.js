import express from "express";
import { getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    assignProjectToTeam,
    assignSprintToProject
 } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(protect); // Apply authentication middleware to all routes below

router.route('/')
    .get(getProjects)
    .post(createProject);

router.route('/:id')
    .get(getProjectById)
    .put(updateProject)
    .delete(deleteProject);

router.route('/:projectId/assign/:teamId')
    .post(assignProjectToTeam);

router.route('/:projectId/assign/sprint/:sprintId')
    .post(assignSprintToProject);

export default router;