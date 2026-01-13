import User from '../models/User.js';
import Role from '../models/Role.js';

// 🟢 Create a new user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔵 Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟡 Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Update a user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔴 Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟣 Assign a role to a user
export const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.params;
    const user = await User.findById(userId);
    const role = await Role.findById(roleId);

    if (!user || !role) return res.status(404).json({ message: 'User or Role not found' });

    user.roles.push(roleId);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ⚫ Remove a role from a user
export const removeRoleFromUser = async (req, res) => {
  try {
    const { userId, roleId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.roles = user.roles.filter(r => r.toString() !== roleId);
    await user.save();

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};