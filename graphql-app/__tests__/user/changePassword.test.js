const { createApolloFetch } = require('apollo-fetch');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('../../typeDefinitions/index');
const resolvers = require('../../resolvers/index');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authorization = req.headers.authorization || '';
    return {
      authorization,
    };
  },
});

const uri = 'http://localhost:3001/graphql';

server.listen(3001);

const apolloFetch = createApolloFetch({ uri });

let variables;
let query;

describe('Change password feature', () => {
  beforeEach(async () => {
    variables = {
      email: '123@123.ru',
      password: '123',
    };
    query = `
              mutation registerUser($email: String!, $password: String!) {
                  registerUser(email: $email, password: $password) {
                  email
                  }
              }
              `;

    await apolloFetch({ query, variables });

    query = `
              mutation loginUser($email: String!, $password: String!) {
                  loginUser(email: $email, password: $password) {
                    email
                    token
                  }
                }
              `;

    const responseWithToken = await apolloFetch({ query, variables });

    query = `
              mutation changePassword($previousPassword: String!, $newPassword: String!) {
                  changePassword(
                  previousPassword: $previousPassword
                  newPassword: $newPassword
                  ) {
                  message
                  }
              }
            `;
    apolloFetch.use(({ request, options }, next) => {
      if (!options.headers) {
        options.headers = {}; // Create the headers object if needed.
      }
      options.headers['authorization'] =
        'Bearer ' + responseWithToken.data.loginUser.token;

      next();
    });
  });

  it('should return success message if valid previous password', async () => {
    variables = {
      previousPassword: '123',
      newPassword: '1234',
    };

    const res = await apolloFetch({ query, variables });

    expect(res.data.changePassword.message).toEqual(
      'Password successfuly changed'
    );
  });

  it('should return error message if invalid previous password', async () => {
    variables = {
      previousPassword: '13',
      newPassword: '1234',
    };

    const res = await apolloFetch({ query, variables });

    expect(res.errors).toBeTruthy();
  });
});
