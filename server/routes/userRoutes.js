import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/')
    .get(getUsers) // Get all users /api/users
    .post(createUser) // Create a new user /api/users

router.route('/:id')
    .get(getUserById) // Get user by ID GET /api/users/:id
    .put(updateUser) // Update user by ID PUT /api/users/:id
    .delete(deleteUser); // Delete user by ID DELETE /api/users/:id

export default router;
