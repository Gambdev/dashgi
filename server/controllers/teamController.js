import Team from '../models/Team.js';

// 🟢 Create a new team
export const createTeam = async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 🔵 Get all teams
export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// 🟡 Get a single team by ID
export const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: 'Team not found' });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🟠 Update a team
export const updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTeam) return res.status(404).json({ message: 'Team not found' });
        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// 🔴 Delete a team
export const deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) return res.status(404).json({ message: 'Team not found' });
        res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};


export const addMemberToTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });
        if (team.members.includes(userId)) return res.status(400).json({ message: 'User is already a member of the team' });
        team.members.push(userId);
        await team.save();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeMemberFromTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });
        if (!team.members.includes(userId)) return res.status(400).json({ message: 'User is not a member of the team' });
        team.members.pull(userId);
        await team.save();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
