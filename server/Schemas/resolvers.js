const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signtoken, signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (_, { username }) => {
      return User.findOne({ username });
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
