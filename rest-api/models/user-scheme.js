const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    score: {
        type: Number
    }
});

module.exports = mongoose.model('User', userScheme);