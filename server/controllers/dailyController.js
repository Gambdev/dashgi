import Daily from '../models/Daily.js';

export const createDaily = async (req, res) => {
    try{
        const daily = new Daily(req.body);
        await daily.save();
        res.status(201).json(daily);
    } catch (error){
        res.status(400).json({message: error.message});
    }
}

export const getDailies = async (req, res) => {
    try {
        const dailies = await Daily.find().populate('user').populate('tasks');
        res.json(dailies);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

export const getDailyById = async (req, res) => {
    try {
        const daily = await Daily.findById(req.params.id).populate('user').populate('tasks');
        res.json(daily);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

export const updateDaily = async (req, res) => {
    try{
        const updatedDaily = await Daily.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedDaily) return res.status(404).json({ message: 'Daily not found' });

        res.json(updatedDaily);
    } catch (error){
        res.status(400).json({ message: error.message });
    }
}

export const deleteDaily = async (req, res) => {
    try{
        const deletedDaily = await Daily.findByIdAndDelete(req.params.id);
        if (!deletedDaily) return res.status(404).json({ message: 'Daily not found' });
        res.json({ message: 'Daily deleted successfully' });
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

export const assignDailyToTeam = async (req, res) => {
    try {
        const { dailyId, teamId } = req.params;
        const daily = await Daily.findById(dailyId);
        if (!daily) return res.status(404).json({ message: 'Daily not found' });
        if (daily.team) return res.status(500).json({ message: 'Daily is already assigned to a team' });
        daily.team = teamId;
        await daily.save();
        res.json(daily);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addAttendeeToDaily = async (req, res) => {
    try {
        const { dailyId, userId } = req.params;
        const daily = await Daily.findById(dailyId);
        if (!daily) return res.status(404).json({ message: 'Daily not found' });
        if (daily.attendees.includes(userId)) return res.status(500).json({ message: 'User is already an attendee of this daily' });
        daily.attendees.push(userId);
        await daily.save();
        res.json(daily);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};