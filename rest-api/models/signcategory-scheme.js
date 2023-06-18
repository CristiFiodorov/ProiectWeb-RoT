const mongoose = require('mongoose');

const signCategoryScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
    },
});

module.exports = mongoose.model('SignCategory', signCategoryScheme);