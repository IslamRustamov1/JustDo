const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');

const { getToken } = require('../../resolvers/user');
const User = require('../../models/userModel');
const typeDefs = require('../../typeDefinitions/index');
const resolvers = require('../../resolvers/index');
const {
  SEND_RESET_LINK,
  REGISTER_USER,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  LOGIN_USER,
} = require('../helpers/constants');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { mutate } = createTestClient(server);

describe('Reset password feature', () => {
  it('should return success message with valid email', async () => {
    await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    const res = await mutate({
      mutation: SEND_RESET_LINK,
      variables: {
        email: 'islamrustamov@rambler.ru',
      },
    });

    expect(res.data.sendResetLink.message).toEqual('Mail successfuly sent');
  });

  it('should return error if user provided an empty email', async () => {
    await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    const res = await mutate({
      mutation: SEND_RESET_LINK,
      variables: {
        email: '',
      },
    });

    expect(res.errors).toBeTruthy();
  });

  it('should return error if user with this email doesnt exist', async () => {
    const res = await mutate({
      mutation: SEND_RESET_LINK,
      variables: {
        email: 'islamrustamov@rambler.ru',
      },
    });

    expect(res.errors).toBeTruthy();
  });

  it('should reset password if valid reset code present', async () => {
    await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    await mutate({
      mutation: SEND_RESET_LINK,
      variables: {
        email: 'islamrustamov@rambler.ru',
      },
    });

    const user = await User.findOne({ email: 'islamrustamov@rambler.ru' });

    expect(user.password).not.toEqual('123456789QQ!');

    const res = await mutate({
      mutation: RESET_PASSWORD,
      variables: {
        password: '123456789QQ!',
        resetPasswordCode: user.resetPasswordCode,
      },
    });

    expect(res.data.resetPassword.message).toEqual(
      'Password successfuly reseted'
    );
  });

  it('should return error if password or code is empty', async () => {
    await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.ru',
        password: '123456789QQ@',
      },
    });

    await mutate({
      mutation: SEND_RESET_LINK,
      variables: {
        email: 'islamrustamov@rambler.ru',
      },
    });

    const user = await User.findOne({ email: 'islamrustamov@rambler.ru' });

    expect(user.password).not.toEqual('123456789QQ!');

    const res = await mutate({
      mutation: RESET_PASSWORD,
      variables: {
        password: '',
        resetPasswordCode: '',
      },
    });

    expect(res.errors).toBeTruthy();
  });

  it('should return error if authentication header is missing', async () => {
    await mutate({
      mutation: REGISTER_USER,
      variables: {
        email: 'islamrustamov@rambler.r',
        password: '123456789QQ@',
      },
    });

    await mutate({
      mutation: LOGIN_USER,
      variables: {
        email: 'islamrustamov@rambler.r',
        password: '123456789QQ@',
      },
    });

    const res = await mutate({
      mutation: CHANGE_PASSWORD,
      variables: {
        previousPassword: '123456789QQ@',
        newPassword: '123456789QQ!',
      },
    });

    expect(res.errors).toBeTruthy();
  });
});
