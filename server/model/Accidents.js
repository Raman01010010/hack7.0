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
        unique: false
    },
    
    longitude: {
        type: String,
        required: true
    },
    date:{
        type:String,
        required: true
    },

    latitude: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    }

});

module.exports = mongoose.model('accident_w', accidentSchema);
