const db = require('../config/connection');
// import models to seed them
const { User, Athlete, Team, EventInstance, Meet, MeetEvent } = require('../models');
const seedData = require('./seedData.json');

db.once('open', async () => {
  // clear/delete all models
  // then insert many from seed file
  await Athlete.deleteMany({});
  await Team.deleteMany({});
  await EventInstance.deleteMany({});
  await Meet.deleteMany({});
  await MeetEvent.deleteMany({});
  await Athlete.create(seedData.athletes);

  const athletes = await Athlete.find().limit(3);
  const athleteIds = athletes.map(athlete => athlete._id);

  const { _id: teamId } = await Team.create(seedData.teams[0]);
  const { _id: meetId } = await Meet.create(seedData.meets[0]);
  const { _id: meetEventId} = await MeetEvent.create({
    ...seedData.meetEvents[0],
    meetId: meetId
  });
  const singleEvent = await EventInstance.create({
    ...seedData.eventInstances[0],
    meetEvent: meetEventId,
    team: teamId,
    heats: [
      {
        heatNumber: 1,
        entrants: [
          {
            athletes: athleteIds
          }
        ]
      }
    ]
  });

  

  console.log('Database seeded!');
  process.exit(0);
});
