import express from 'express';
import {
    createSprint,
    getSprints,
    getSprintbyId,
    updateSprint,
    deleteSprint,
    getSprintsByProject,
} from '../controllers/sprintController.js';

const router = express.Router();


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