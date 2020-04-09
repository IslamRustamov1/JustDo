const todosResolvers = require('./todos');
const userResolvers = require('./user');
const urgenciesResolvers = require('./urgencies');

module.exports = {
  Query: {
    ...todosResolvers.Query,
    ...urgenciesResolvers.Query,
  },
  Mutation: {
    ...urgenciesResolvers.Mutation,
    ...todosResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
