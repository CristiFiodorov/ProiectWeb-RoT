const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testId: Number,
  questions: [String]
});

module.exports = mongoose.model('Test', testSchema);
