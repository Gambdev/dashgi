import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

// Create new employee
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().populate('group');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;