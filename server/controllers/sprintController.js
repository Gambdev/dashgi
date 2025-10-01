import Sprint from "../models/Sprint.js";

export const createSprint = async (req, res) => {
    try {
        const sprint = new Sprint(req.body);
        await sprint.save();
        res.status(201).json(sprint);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSprints = async (req, res) => {

    try {
        const sprints = await Sprint.find().populate('project');
        res.status(200).json(sprints);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const getSprintbyId = async (req, res) => {
    try {
        const sprint = await Sprint.find({ _id: req.params.id }).populate('project');
        res.status(200).json(sprint);
    }catch (error){
        res.status(400).json({ message: error.message });
    }

}

export const updateSprint = async (req, res) => {
    try {
        const updateSprint = await Sprint.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updateSprint) return res.status(404).json({ message: 'Sprint not found' });
        res.status(200).json(updateSprint);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteSprint = async (req, res) => {
    try {
        const deleteSprint = await Sprint.findByIdAndDelete(req.params.id);
        if (!deleteSprint) return res.status(404).json({ message: 'Sprint not found' });
        res.status(200).json({ message: 'Sprint deleted successfully' });
    }catch(error) {
        res.status(400).json({ message:error.message });
    }
};

export const getSprintsByProject = async (req, res) => {
    try {
        const sprints = await Sprint.find({ project: req.params.projectId }).populate('project');
        res.status(200).json(sprints);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Maybe do an assign project to sprint? but i think projects are first and then the sprints are second, so it would be weird to assign a project to a sprint, when the sprint is created inside a project.