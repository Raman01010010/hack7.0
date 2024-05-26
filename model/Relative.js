const mongoose = require('mongoose');

const safetyNumberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_w',
    required:true
  },
  email:{
    type: String,
   // unique:true
  },
  phoneNumber: {
    type: String,
   // unique:true,
   // required: true
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
