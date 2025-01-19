const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 100,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
