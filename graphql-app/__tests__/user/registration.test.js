const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('../../typeDefinitions/index');
const resolvers = require('../../resolvers/index');
const { REGISTER_USER } = require('../helpers/constants');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { mutate } = createTestClient(server);

describe('Registration feature', () => {
  it('should return email with valid credentials', async () => {
    const res = await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    expect(res.data.registerUser.email).toBeTruthy();
  });

  it('should return error if user with this email already exists', async () => {
    await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    const res = await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    expect(res.errors).toBeTruthy();
  });

  it('should return error with invalid credentials', async () => {
    const res = await mutate({
      mutation: REGISTER_USER,
      variables: { email: '123', password: '' },
    });

    expect(res.errors).toBeTruthy();
  });
});
