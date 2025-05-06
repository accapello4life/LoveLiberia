const Match = require('../models/Match');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { calculateCulturalCompatibility } = require('../utils/matchingAlgorithm');

// @desc    Get all matches for a user
// @route   GET /api/v1/matches
// @access  Private
exports.getMatches = asyncHandler(async (req, res, next) => {
  const matches = await Match.find({
    $or: [{ user1: req.user.id }, { user2: req.user.id }]
  })
  .populate('user1', 'firstName lastName profilePhoto')
  .populate('user2', 'firstName lastName profilePhoto');

  res.status(200).json({
    success: true,
    count: matches.length,
    data: matches
  });
});

// @desc    Get potential matches based on cultural compatibility
// @route   GET /api/v1/matches/potential
// @access  Private
exports.getPotentialMatches = asyncHandler(async (req, res, next) => {
  // Get current user
  const currentUser = await User.findById(req.user.id);

  // Get all users except current user
  const users = await User.find({ _id: { $ne: req.user.id } });

  // Calculate compatibility scores
  const potentialMatches = users.map(user => {
    const compatibility = calculateCulturalCompatibility(currentUser, user);
    return {
      user,
      compatibilityScore: compatibility.totalScore,
      culturalMatchFactors: compatibility.culturalMatchFactors
    };
  });

  // Sort by highest compatibility
  potentialMatches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  res.status(200).json({
    success: true,
    count: potentialMatches.length,
    data: potentialMatches
  });
});

// @desc    Create new match
// @route   POST /api/v1/matches
// @access  Private
exports.createMatch = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  // Get both users
  const user1 = await User.findById(req.user.id);
  const user2 = await User.findById(userId);

  if (!user2) {
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  }

  // Calculate compatibility
  const compatibility = calculateCulturalCompatibility(user1, user2);

  // Create match
  const match = await Match.create({
    user1: req.user.id,
    user2: userId,
    compatibilityScore: compatibility.totalScore,
    culturalMatchFactors: compatibility.culturalMatchFactors
  });

  res.status(201).json({
    success: true,
    data: match
  });
});
