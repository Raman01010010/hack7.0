const mongoose = require('mongoose');
const { booked } = require('../controllers/slotController');
const Schema = mongoose.Schema;



const timeSlotSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    booked: { type: Boolean, default: false },
    bookedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_w',
      required: false,
    }
  });
  module.exports = mongoose.model('timSlot', timeSlotSchema);