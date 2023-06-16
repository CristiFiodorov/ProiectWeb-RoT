const mongoose = require('mongoose');

const courseScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Course', courseScheme);