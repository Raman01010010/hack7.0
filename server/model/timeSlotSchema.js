const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const timeSlotSchema = new mongoose.Schema({
  parkingProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingLot',
    required: false,
  },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  booked: { type: Boolean, default: false },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_w',
    required: false,
  }
  ,
  licensePlate: {
    type: String,
    required: false
},
vehicleType: {
    type: String,
    required: false
},
ownerName: {
    type: String,
    required: false
},
phone: {
    type: String,
    required: false
},
company: {
    type: Schema.Types.ObjectId,
    ref: 'ParkingLot'
},
key: {
    type: String,
    required: false
},
status: {
    type: String
}
});
module.exports = mongoose.model('timeSlot', timeSlotSchema);