//import individual models
const User = require('./User');
const Athlete = require('./Athlete');
const EventInstance = require('./EventInstance');
const Meet = require('./Meet');
const Team = require('./Team');
const MeetEvent = require('./MeetEvent');

//export models as an object
module.exports = { User, Athlete, MeetEvent, EventInstance, Meet, Team };
