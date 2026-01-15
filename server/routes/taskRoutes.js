import express from 'express';
import { createTask,
    getTaskById,
    getTasks,
    updateTask,
    deleteTask,
    assignTaskToUser,
    assignTaskToSprint
} from '../controllers/taskController.js';  
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.use(protect); // Apply authentication middleware to all routes below
router.route('/')
    .post(createTask)
    .get(getTasks);

router.route('/:id')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);

router.route('/assign/user/:taskId/:userId')
    .put(assignTaskToUser);

router.route('/assign/sprint/:taskId/:sprintId')
    .put(assignTaskToSprint);

export default router;