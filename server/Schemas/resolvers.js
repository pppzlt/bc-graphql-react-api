const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signtoken, signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, { username }) => {
      return User.findOne({ username });
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = singToken(user);

      return { token, user };
    },
    saveBook: async (_, { id, input }) => {
      return User.findOneAndUpdate(
        { _id: id },
        { $addToSet: { savedBooks: input } },
        { new: true }
      );
    },
    removeBook: async (_, { id, bookId }) => {
      return User.findOneAndUpdate(
        { _id: id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
