const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
// import models
const { User } = require('../models');

// define our resolvers
const resolvers = {
  // queries (read operations)
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { email }) => {
      return User.findOne({ email });
    }
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

  },
};

module.exports = resolvers;