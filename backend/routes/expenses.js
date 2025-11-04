const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { auth, isManager } = require('../middleware/auth');

// Create expense (Driver)
router.post('/', auth, async (req, res) => {
  try {
    const { amount, category, description, date, receiptUrl } = req.body;

    const expense = new Expense({
      driverId: req.user._id,
      amount,
      category,
      description,
      date: date || Date.now(),
      receiptUrl
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all expenses (Manager can see all, Driver can see only their own)
router.get('/', auth, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = {};

    // If driver, only show their expenses
    if (req.user.role === 'driver') {
      query.driverId = req.user._id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(query)
      .populate('driverId', 'username fullName')
      .populate('approvedBy', 'username fullName')
      .sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single expense
router.get('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate('driverId', 'username fullName')
      .populate('approvedBy', 'username fullName');

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Check authorization
    if (req.user.role === 'driver' && expense.driverId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update expense (Driver can only update pending expenses)
router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Check authorization
    if (req.user.role === 'driver') {
      if (expense.driverId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      if (expense.status !== 'pending') {
        return res.status(400).json({ message: 'Cannot update non-pending expense' });
      }
    }

    const { amount, category, description, date, receiptUrl } = req.body;

    if (amount !== undefined) expense.amount = amount;
    if (category !== undefined) expense.category = category;
    if (description !== undefined) expense.description = description;
    if (date !== undefined) expense.date = date;
    if (receiptUrl !== undefined) expense.receiptUrl = receiptUrl;

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Approve expense (Manager only)
router.post('/:id/approve', auth, isManager, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.status !== 'pending') {
      return res.status(400).json({ message: 'Expense is not pending' });
    }

    expense.status = 'approved';
    expense.approvedBy = req.user._id;
    expense.approvalDate = Date.now();

    await expense.save();
    await expense.populate('driverId', 'username fullName');
    await expense.populate('approvedBy', 'username fullName');

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Reject expense (Manager only)
router.post('/:id/reject', auth, isManager, async (req, res) => {
  try {
    const { reason } = req.body;
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.status !== 'pending') {
      return res.status(400).json({ message: 'Expense is not pending' });
    }

    expense.status = 'rejected';
    expense.approvedBy = req.user._id;
    expense.approvalDate = Date.now();
    expense.rejectionReason = reason || 'No reason provided';

    await expense.save();
    await expense.populate('driverId', 'username fullName');
    await expense.populate('approvedBy', 'username fullName');

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete expense (Driver can only delete their pending expenses)
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Check authorization
    if (req.user.role === 'driver') {
      if (expense.driverId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      if (expense.status !== 'pending') {
        return res.status(400).json({ message: 'Cannot delete non-pending expense' });
      }
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
