const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { AuthenticationError } = require('apollo-server');

const Urgency = require('../models/urgencyModel');
const { SECRET } = require('../config');

const getUser = async (authorization) => {
  if (!authorization) throw new AuthenticationError('You have to login first');

  const token = authorization.split('Bearer ')[1];
  if (!token) throw new AuthenticationError('No token provided');

  const user = await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) throw new AuthenticationError('Invalid token');
    return decoded;
  });
  return user;
};

module.exports = {
  Query: {
    async getUrgencies(_, __, { authorization }) {
      const user = await getUser(authorization);

      if (user) {
        try {
          const urgencies = await Urgency.find({ user: user.id });

          return urgencies;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
  },

  Mutation: {
    async createUrgency(_, { name, color, level }, { authorization }) {
      const user = await getUser(authorization);

      if (user) {
        try {
          const newUrgency = new Urgency();

          newUrgency.name = name;
          newUrgency.color = color;
          newUrgency.level = level;

          newUrgency.user = user.id;

          const urgency = await newUrgency.save();

          return urgency;
        } catch (err) {
          throw new Error(err);
        }
      }
    },

    async deleteUrgency(_, { urgencyId }, { authorization }) {
      const user = await getUser(authorization);
      try {
        const urgency = await Urgency.findById(
          mongoose.Types.ObjectId(urgencyId)
        );
        if (urgency) {
          if (urgency.user.toString() === user.id) {
            await urgency.delete();
          } else
            throw new AuthenticationError('You cannot delete this urgency');
        } else throw new Error('Urgency is not found');
        return { message: 'Urgency deleted!' };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
