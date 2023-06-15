const mongoose = require('mongoose');

const signSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    image_url: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    index: {
      type: Number,
      required: true
    }
  });
   
  module.exports = mongoose.model('Sign', signSchema);