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
    },
    tests: [
        {
            testId: String,
            score: Number
        }
    ]
});

module.exports = mongoose.model('User', userScheme);