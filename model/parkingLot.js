const ParkingLotSchema = new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            required:false
        },
        coordinates: {
            type: [Number],
            required:false
        }
    },
    parkingLotName: {
        type: String,
        required:false
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    totalSlots: {
        type: Number,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    email:{
        type:String ,
        required:false
    },
    vehiclesParked: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle' 
    }]
});



module.exports = {
  
    ParkingLot: mongoose.model('ParkingLot', ParkingLotSchema)
};