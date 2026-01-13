const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  permissions: [{ type: String }] // keep as simple strings; change to refs if you prefer a Permission model
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);