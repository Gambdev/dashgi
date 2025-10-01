import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], //to refer to user model.
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' } //to refer to project model.
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);  