const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const FormdataModel = mongoose.model('scores', formDataSchema);
module.exports = FormdataModel;