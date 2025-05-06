const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  compatibilityScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  culturalMatchFactors: {
    ethnicity: Number,
    religion: Number,
    languages: Number,
    location: Number
  },
  matchedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
});

// Ensure unique pair of users
MatchSchema.index({ user1: 1, user2: 1 }, { unique: true });

module.exports = mongoose.model('Match', MatchSchema);
