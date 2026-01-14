import express from "express";
import {
    createDaily,
    getDailies,
    getDailyById,
    updateDaily,
    deleteDaily,
    assignDailyToTeam,
    addAttendeeToDaily
} from "../controllers/dailyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.use(protect); // Apply authentication middleware to all routes below

router.route('/')
    .get(getDailies)
    .post(createDaily);

router.route('/:id')
    .get(getDailyById)
    .put(updateDaily)
    .delete(deleteDaily);

router.route('/:dailyId/assign/:teamId')
    .post(assignDailyToTeam);


router.route('/:dailyId/attend/:userId')
    .post(addAttendeeToDaily);

export default router;