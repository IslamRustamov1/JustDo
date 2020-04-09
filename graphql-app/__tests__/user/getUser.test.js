const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('../../typeDefinitions/index');
const resolvers = require('../../resolvers/index');
const { REGISTER_USER, LOGIN_USER } = require('../helpers/constants');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { mutate } = createTestClient(server);

const { getUser } = require('../../resolvers/user');

describe('getUser method tests', () => {
  it('should return error if no arguments', async () => {
    try {
      await getUser();
    } catch (error) {
      expect(error.message).toEqual('You have to login first');
    }
  });

  it('should return error if no token', async () => {
    try {
      await getUser('Bearer');
    } catch (error) {
      expect(error.message).toEqual('No token provided');
    }
  });

  it('should return error if invalid token', async () => {
    try {
      await getUser('Bearer 123');
    } catch (error) {
      expect(error.message).toEqual('Invalid token');
    }
  });

  it('should return email if valid token', async () => {
    await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    const res = await mutate({
      mutation: LOGIN_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    const user = await getUser('Bearer ' + res.data.loginUser.token);

    expect(user.email).toEqual('islamrustamov@rambler.ru');
  });
});
