import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'}, // Reference to the Role model, put on required true later
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' } // Reference to the Team model, put on required true later
}, { timestamps: true });

export default mongoose.model('User', userSchema);