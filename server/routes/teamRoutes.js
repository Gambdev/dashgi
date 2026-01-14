import express from 'express';
import {
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    addMemberToTeam,
    removeMemberFromTeam
} from '../controllers/teamController.js';
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();
router.use(protect); // Apply authentication middleware to all routes below

router.route('/')
    .get(getTeams) // Get all teams /api/teams
    .post(createTeam); // Create a new team /api/teams

router.route('/:id')
    .get(getTeamById) // Get a single team by ID /api/teams/:id
    .put(updateTeam) // Update a team /api/teams/:id
    .delete(deleteTeam); // Delete a team /api/teams/:id

router.route('/:teamId/members/:userId')
    .post(addMemberToTeam) // Add a member to a team /api/teams/:teamId/members/:userId
    .delete(removeMemberFromTeam); // Remove a member from a team /api/teams/:teamId/members/:userId

export default router;