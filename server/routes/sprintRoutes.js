import express from 'express';
import {
    createSprint,
    getSprints,
    getSprintbyId,
    updateSprint,
    deleteSprint,
    getSprintsByProject,
} from '../controllers/sprintController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // Apply authentication middleware to all routes below

router.route('/')
    .post(createSprint)
    .get(getSprints);

router.route('/:id')
    .get(getSprintbyId)
    .put(updateSprint)
    .delete(deleteSprint);

router.route('/project/:projectId')
    .get(getSprintsByProject);


export default router;