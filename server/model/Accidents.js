const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accidentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    
    longitude: {
        type: String,
        required: true
    },

    latitude: {
        type: String,
        required: true
    },
    discription:{
        type:String,
        required: true
    }

});

module.exports = mongoose.model('accident_w', accidentSchema);
