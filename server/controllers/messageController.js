const Message = require('../models/Message');
const Match = require('../models/Match');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all messages between two users
// @route   GET /api/v1/messages/:userId
// @access  Private
exports.getMessages = asyncHandler(async (req, res, next) => {
  // Check if users are matched
  const match = await Match.findOne({
    $or: [
      { user1: req.user.id, user2: req.params.userId },
      { user1: req.params.userId, user2: req.user.id }
    ],
    status: 'accepted'
  });

  if (!match) {
    return next(new ErrorResponse('You are not matched with this user', 401));
  }

  const messages = await Message.find({
    $or: [
      { sender: req.user.id, recipient: req.params.userId },
      { sender: req.params.userId, recipient: req.user.id }
    ]
  }).sort('createdAt');

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages
  });
});

// @desc    Send message to matched user
// @route   POST /api/v1/messages
// @access  Private
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { recipient, content } = req.body;

  // Check if users are matched
  const match = await Match.findOne({
    $or: [
      { user1: req.user.id, user2: recipient },
      { user1: recipient, user2: req.user.id }
    ],
    status: 'accepted'
  });

  if (!match) {
    return next(new ErrorResponse('You are not matched with this user', 401));
  }

  const message = await Message.create({
    sender: req.user.id,
    recipient,
    content
  });

  res.status(201).json({
    success: true,
    data: message
  });
});
