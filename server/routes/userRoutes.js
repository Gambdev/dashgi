import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    assignRoleToUser,
    removeRoleFromUser,
    registerUser,
    loginUser
} from '../controllers/userController.js';
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


router.post('/register', registerUser); // User registration POST /api/users/register

router.post('/login', loginUser); // User login POST /api/users/login


router.use(protect); // Apply authentication middleware to all routes below

router.route('/')
    .get(getUsers) // Get all users /api/users
    .post(createUser) // Create a new user /api/users

router.route('/:id')
    .get(getUserById) // Get user by ID GET /api/users/:id
    .put(updateUser) // Update user by ID PUT /api/users/:id
    .delete(deleteUser); // Delete user by ID DELETE /api/users/:id


router.route('/:id/roles')
    .post(assignRoleToUser) // Assign role to user POST /api/users/:id/roles

router.route('/:id/roles/:roleId')
    .delete(removeRoleFromUser) // Remove role from user DELETE /api/users/:id/roles/:roleId
export default router;
