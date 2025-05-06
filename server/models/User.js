const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false
  },
  // Cultural attributes
  ethnicity: {
    type: String,
    enum: ['Kpelle', 'Bassa', 'Grebo', 'Gio', 'Mano', 'Kru', 'Loma', 'Mandingo', 'Krahn', 'Gola', 'Vai', 'Other'],
    required: true
  },
  religion: {
    type: String,
    enum: ['Christian', 'Muslim', 'Traditional', 'Other', 'None'],
    required: true
  },
  languages: [{
    type: String,
    enum: ['English', 'Kpelle', 'Bassa', 'Grebo', 'Gio', 'Mano', 'Kru', 'Loma', 'Mandingo', 'Krahn', 'Gola', 'Vai']
  }],
  location: {
    type: String,
    enum: ['Liberia', 'USA', 'Canada', 'UK', 'Other'],
    required: true
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500
  },
  interests: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT token
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
