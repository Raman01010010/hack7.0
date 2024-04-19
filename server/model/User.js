const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true
    },

    pwd: {
        type: String,
        required: true
    },
    picture:{
        type:String,
        default:"xx",
        required:false
    },
    refreshToken: String,
    location:String,
    status:[{org:String,role:String,desc:String}],
    alertedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_w'
    }],
    alertingTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_w'
    }],


    what_your_status: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('user_w', userSchema);
