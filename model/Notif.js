const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    notifications: {
        type: [String],  // Array of strings to store notifications
        required: false  // Set to false if you don't want it to be required
    }
});

module.exports = mongoose.model('Notification', notifSchema);
