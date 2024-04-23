const mongoose = require('mongoose');

const safetyNumberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique:true,
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



module.exports = mongoose.model('SafetyNumber', safetyNumberSchema);
