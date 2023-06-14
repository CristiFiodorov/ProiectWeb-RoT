const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  image_url: String,
  answers: [
    {
      content: String,
      isValid: Boolean
    }
  ]
});

module.exports = mongoose.model('Question', questionSchema);
