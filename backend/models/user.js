const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // Questionnaire responses
  age: {
    type: Number,
    default: null
  },
  kingdom: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  favElement: {
    type: String,
    default: ''
  },
  strength: {
    type: String,
    default: ''
  },
  favSubject: {
    type: String,
    default: ''
  },
  companion: {
    type: String,
    default: ''
  },
  weapon: {
    type: String,
    default: ''
  },
  aura: {
    type: String,
    default: ''
  },
  // Generated result properties
  house: {
    type: String,
    default: ''
  },
  magicPower: {
    type: Number,
    default: 0
  },
  stats: {
    leadership: { type: Number, default: 0 },
    wisdom: { type: Number, default: 0 },
    creativity: { type: Number, default: 0 },
    bravery: { type: Number, default: 0 }
  },
  hasCompletedQuestionnaire: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
