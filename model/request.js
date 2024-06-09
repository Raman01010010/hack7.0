const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('req_w', reqSchema);