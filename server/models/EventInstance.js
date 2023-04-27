const { Schema, model } = require('mongoose');

const eventInstanceSchema = new Schema({
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
  trackLength: {
    type: Number
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  meetEvent: {
    type: Schema.Types.ObjectId,
    ref: 'MeetEvent'
  },
  meet: {
    type: Schema.Types.ObjectId,
    ref: 'Meet'
  },
  heats: [
    {
      heatNumber: {
        type: Number
      },
      entrants: [
        {
          athletes: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Athlete'
            }
          ],
          splitTimes: [
            {
              type: Date
            }
          ]
        }
      ]
    }
  ]
});

const EventInstance = model('EventInstance', eventInstanceSchema);

module.exports = EventInstance;