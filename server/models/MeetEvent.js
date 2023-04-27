const { Schema, model } = require('mongoose');

const meetEventSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  legs: [
    {
      type: Number
    }
  ],
  distance: {
    type: Number
  },
  meet: {
    type: Schema.Types.ObjectId,
    ref: 'Meet'
  }
});

const MeetEvent = model('MeetEvent', meetEventSchema);

module.exports = MeetEvent;