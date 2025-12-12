import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find().populate('assignedTo').populate('sprint');

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo').populate('sprint');

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        
        res.json(updatedTask);    

    } catch (error){
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignTaskToUser = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.assignedTo) return res.status(500).json({ message: 'Task is already assigned to a user' });
        if(!userId) return res.status(404).json({ message: 'User does not exist' });
        task.assignedTo = userId;
        await task.save();
        res.json(task);
    } catch( error ) {
        res.status(500).json({ message: error.message });
    }
};

export const assignTaskToSprint = async (req, res) => {
    try {
        const { taskId, sprintId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.sprint) return res.status(500).json({ message: 'Task is already assigned to a sprint' });
        if (!sprintId) return res.status(404).json({ message: 'Sprint does not exist' });
        task.sprint = sprintId;
        await task.save();
        res.json(task);
    } catch( error ) {
        res.status(500).json({ message: error.message });   
    }
};