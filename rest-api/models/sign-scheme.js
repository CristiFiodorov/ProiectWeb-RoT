const mongoose = require('mongoose');

const signScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Sign', signScheme);