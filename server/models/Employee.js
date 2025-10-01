import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Developer', 'ScrumMaster', 'Manager'], required: true },
  email: { type: String, required: true, unique: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);