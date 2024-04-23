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
    phone:{
        type:String,
        required:true
    }
});
const ParkingLotSchema = new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'], // Ensure it's a GeoJSON point
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
    timestart: {
        type: String,
        required: true
    },
    timeend:{
        type: String,
        required: true
    },
    totalSlots: {
        type: Number,
        required: true
    },
    vehiclesParked: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle' 
    }]
});
ParkingLotSchema.index({ location: '2dsphere' });
module.exports = {
    Vehicle: mongoose.model('Vehicle', VehicleSchema),
    ParkingLot: mongoose.model('ParkingLot', ParkingLotSchema)
};
