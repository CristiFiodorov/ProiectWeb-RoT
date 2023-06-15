const mongoose = require('mongoose');

const signCategoryScheme = new mongoose.Schema({
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
    signs: [{
        type: Number,
        ref: 'Sign'
    }]
});

module.exports = mongoose.model('SignCategory', signCategoryScheme);