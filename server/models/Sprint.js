import mongoose from "mongoose";


const sprintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate:{type: Date, required: true},
    goals: [{type: String}],
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },// Reference to the Project model
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Array of references to Task model
    dailies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Daily' }], // Array of references to Daily model
}, { timestamps: true });

export default mongoose.model('Sprint', sprintSchema);
