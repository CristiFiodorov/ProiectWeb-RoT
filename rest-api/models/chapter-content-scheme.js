const mongoose = require('mongoose');

const contentScheme = new mongoose.Schema({
    elementType: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }, 
    tags: {
        type: [String]
    }
});

const chapterContentScheme = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: [contentScheme],
        required: true
    }
});

module.exports = mongoose.model('ChapterContent', chapterContentScheme);