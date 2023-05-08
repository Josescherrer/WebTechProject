const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  name: String,
  question: String,
  answer: String,
});

module.exports = mongoose.model('Question', questionSchema);
