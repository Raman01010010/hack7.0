const mongoose = require('mongoose');

const alert = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_w',
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String
    // You can add additional properties like required, default, etc. as needed
  }
});

module.exports = mongoose.model('alert', alert);
