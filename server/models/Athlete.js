const { Schema, model } = require('mongoose');

const athleteSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  grade: {
    type: Number,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
});

const Athlete = model('Athlete', athleteSchema);

module.exports = Athlete;