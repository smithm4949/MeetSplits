const { Schema, model } = require('mongoose');

const meetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  trackLength: {
    type: Number,
    required: true
  },
  meetEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MeetEvent'
    }
  ]
});

const Meet = model('Meet', meetSchema);

module.exports = Meet;