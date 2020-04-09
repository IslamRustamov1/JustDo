const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('../../typeDefinitions/index');
const resolvers = require('../../resolvers/index');
const { LOGIN_USER, REGISTER_USER } = require('../helpers/constants');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { mutate } = createTestClient(server);

describe('Login feature', () => {
  it('should return token with valid credentials', async () => {
    const registerRequest = await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    expect(registerRequest.data.registerUser.email).toEqual(
      'islamrustamov@rambler.ru'
    );

    const res = await mutate({
      mutation: LOGIN_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    expect(res.data.loginUser.token).toBeTruthy();
  });

  it('should return error with invalid credentials', async () => {
    const res = await mutate({
      mutation: LOGIN_USER,
      variables: { email: '123', password: '123' },
    });

    expect(res.errors).toBeTruthy();
  });

  it('should return error with empty credentials', async () => {
    const res = await mutate({
      mutation: LOGIN_USER,
      variables: { email: '', password: '' },
    });

    expect(res.errors).toBeTruthy();
  });
});
