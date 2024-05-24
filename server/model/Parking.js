const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    licensePlate: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    time_duration: {
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingLot'
    },
    key: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
});

const ParkingLotSchema = new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    parkingLotName: {
        type: String,
        required: true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    totalSlots: {
        type: Number,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String ,
        required:true
    },
    vehiclesParked: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle' 
    }]
});

ParkingLotSchema.index({ location: '2dsphere' });



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
      type: String,
      required: false,
    },
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
   
  });
  
  module.exports = 
  
module.exports = {
    TimeSlot: mongoose.model('TimeSlot', timeSlotSchema),
    Vehicle: mongoose.model('Vehicle', VehicleSchema),
    ParkingLot: mongoose.model('ParkingLot', ParkingLotSchema)
};
