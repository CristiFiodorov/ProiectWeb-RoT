const mongoose = require('mongoose');

const chapterScheme = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Chapter', chapterScheme);