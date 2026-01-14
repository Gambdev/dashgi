import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    permissions: [{ type: String }] // keep as simple strings; change to refs if you prefer a Permission model
}, { timestamps: true });

export default mongoose.model('Role', roleSchema);
