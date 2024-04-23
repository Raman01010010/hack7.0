const mongoose = require('mongoose');

const safetyNumberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
});

const SafetyNumber = mongoose.model('SafetyNumber', safetyNumberSchema);

module.exports = SafetyNumber;
