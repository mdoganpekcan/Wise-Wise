const express = require('express');
const router = express.Router();
const Breakdown = require('../models/Breakdown');
const { auth, isManager } = require('../middleware/auth');

// Create breakdown report (Driver)
router.post('/', auth, async (req, res) => {
  try {
    const { vehicleId, location, description, severity, photoUrls } = req.body;

    const breakdown = new Breakdown({
      driverId: req.user._id,
      vehicleId,
      location,
      description,
      severity: severity || 'medium',
      photoUrls: photoUrls || []
    });

    await breakdown.save();
    res.status(201).json(breakdown);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all breakdowns (Manager can see all, Driver can see only their own)
router.get('/', auth, async (req, res) => {
  try {
    const { status, severity, startDate, endDate } = req.query;
    let query = {};

    // If driver, only show their breakdowns
    if (req.user.role === 'driver') {
      query.driverId = req.user._id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by severity
    if (severity) {
      query.severity = severity;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.reportDate = {};
      if (startDate) query.reportDate.$gte = new Date(startDate);
      if (endDate) query.reportDate.$lte = new Date(endDate);
    }

    const breakdowns = await Breakdown.find(query)
      .populate('driverId', 'username fullName')
      .populate('acknowledgedBy', 'username fullName')
      .sort({ reportDate: -1 });

    res.json(breakdowns);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single breakdown
router.get('/:id', auth, async (req, res) => {
  try {
    const breakdown = await Breakdown.findById(req.params.id)
      .populate('driverId', 'username fullName')
      .populate('acknowledgedBy', 'username fullName');

    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }

    // Check authorization
    if (req.user.role === 'driver' && breakdown.driverId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(breakdown);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update breakdown (Driver can update only reported breakdowns)
router.put('/:id', auth, async (req, res) => {
  try {
    const breakdown = await Breakdown.findById(req.params.id);

    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }

    // Check authorization
    if (req.user.role === 'driver') {
      if (breakdown.driverId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      if (breakdown.status !== 'reported') {
        return res.status(400).json({ message: 'Cannot update acknowledged breakdown' });
      }
    }

    const { vehicleId, location, description, severity, photoUrls } = req.body;

    if (vehicleId !== undefined) breakdown.vehicleId = vehicleId;
    if (location !== undefined) breakdown.location = location;
    if (description !== undefined) breakdown.description = description;
    if (severity !== undefined) breakdown.severity = severity;
    if (photoUrls !== undefined) breakdown.photoUrls = photoUrls;

    await breakdown.save();
    res.json(breakdown);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Acknowledge breakdown (Manager only)
router.post('/:id/acknowledge', auth, isManager, async (req, res) => {
  try {
    const breakdown = await Breakdown.findById(req.params.id);

    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }

    if (breakdown.status !== 'reported') {
      return res.status(400).json({ message: 'Breakdown is already acknowledged' });
    }

    breakdown.status = 'acknowledged';
    breakdown.acknowledgedBy = req.user._id;
    breakdown.acknowledgementDate = Date.now();

    await breakdown.save();
    await breakdown.populate('driverId', 'username fullName');
    await breakdown.populate('acknowledgedBy', 'username fullName');

    res.json(breakdown);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update breakdown status (Manager only)
router.post('/:id/status', auth, isManager, async (req, res) => {
  try {
    const { status, resolutionNotes, estimatedCost } = req.body;
    const breakdown = await Breakdown.findById(req.params.id);

    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }

    if (status) {
      breakdown.status = status;
      if (status === 'resolved') {
        breakdown.resolutionDate = Date.now();
      }
    }

    if (resolutionNotes !== undefined) {
      breakdown.resolutionNotes = resolutionNotes;
    }

    if (estimatedCost !== undefined) {
      breakdown.estimatedCost = estimatedCost;
    }

    await breakdown.save();
    await breakdown.populate('driverId', 'username fullName');
    await breakdown.populate('acknowledgedBy', 'username fullName');

    res.json(breakdown);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete breakdown (Driver can only delete their reported breakdowns)
router.delete('/:id', auth, async (req, res) => {
  try {
    const breakdown = await Breakdown.findById(req.params.id);

    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }

    // Check authorization
    if (req.user.role === 'driver') {
      if (breakdown.driverId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      if (breakdown.status !== 'reported') {
        return res.status(400).json({ message: 'Cannot delete acknowledged breakdown' });
      }
    }

    await Breakdown.findByIdAndDelete(req.params.id);
    res.json({ message: 'Breakdown deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
