import mongoose from "mongoose";

const dailySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    notes: {type: String, required:true},
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Reference to the Team model
    sprint: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint' }, // Reference to the Sprint model
    attendees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of references to User model}
}, { timestamps: true });