import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
