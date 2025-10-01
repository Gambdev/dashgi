import mongoose from "mongoose";


const sprintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate:{type: Date, required: true},
    goals: [{type: String}],
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },// Reference to the Project model
}, { timestamps: true });

export default mongoose.model('Sprint', sprintSchema);
