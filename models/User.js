const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: True
    },
    password: {
        type: String,
        required: true
    }
})

User = mongoose.model('user', userSchema);
module.exports = User