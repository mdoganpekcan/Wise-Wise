const mongoose = require('mongoose');

const breakdownSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleId: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['reported', 'acknowledged', 'in_progress', 'resolved'],
    default: 'reported'
  },
  reportDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  acknowledgedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  acknowledgementDate: {
    type: Date
  },
  resolutionDate: {
    type: Date
  },
  resolutionNotes: {
    type: String
  },
  estimatedCost: {
    type: Number,
    min: 0
  },
  photoUrls: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

breakdownSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Breakdown', breakdownSchema);
