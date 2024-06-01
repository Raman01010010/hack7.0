const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('S_user', SuserSchema);
