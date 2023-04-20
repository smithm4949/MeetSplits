const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  abbreviation: {
    type: String,
    required: true,
    unique: true
  },
  settings: {
    accentColorLight: {
      type: String,
      length: 6
    },
    accentColorDark: {
      type: String,
      length: 6
    },
  }
});

const Team = model('Team', teamSchema);

module.exports = Team;