const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
// import models
const { User, Meet, Athlete, EventInstance } = require('../models');

// define our resolvers
const resolvers = {
  // queries (read operations)
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { email }) => {
      return User.findOne({ email });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    athletes: async (parent, { team }, context) => {
      return Athlete.find({ team });
    },
    events:  async () => {
      return EventInstance.find();
    },
    meets: async () => {
      return Meet.find();
    },
    eventInstance: async (parent, { eventId, teamId }) => {
      let foundEvent = await EventInstance.findOne({ team: teamId, meetEvent: eventId });
      if (!foundEvent) {
        foundEvent = await EventInstance.create({meetEvent: eventId, team: teamId});
      }
      return foundEvent;
    },
  },

  // mutations (write operations)
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addSplits: async(parent, { eventId, heatIndex, entrantIndex, splitsArray }) => {
      const singleEvent = await EventInstance.findById(eventId);
      singleEvent.heats[heatIndex].entrants[entrantIndex].splits = splitsArray;
      const updatedEvent = await EventInstance.findByIdAndUpdate(eventId, {
        heats: singleEvent.heats
      })
      return updatedEvent;
    }

  },
};

module.exports = resolvers;