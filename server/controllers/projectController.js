import Project from '../models/Project.js';

export const createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('team');
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('team');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignProjectToTeam = async (req, res) => {
    try {
        const { projectId, teamId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        if (project.team) return res.status(400).json({ message: 'Project is already assigned to a team' });
        if (!teamId) return res.status(400).json({ message: 'Team does not exist' });
        project.team = teamId;
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const assignSprintToProject = async (req, res) => {
    try {
        const { projectId, sprintId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        if (project.sprints.includes(sprintId)) return res.status(400).json({ message: 'Sprint is already assigned to this project' });
        project.sprints.push(sprintId);
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};