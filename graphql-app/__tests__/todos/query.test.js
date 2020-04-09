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

const uri = 'http://localhost:3000/graphql';

server.listen(3000);

const apolloFetch = createApolloFetch({ uri });

let variables;
let query;

describe('Get todos feature', () => {
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

    apolloFetch.use(({ request, options }, next) => {
      if (!options.headers) {
        options.headers = {}; // Create the headers object if needed.
      }
      options.headers['authorization'] =
        'Bearer ' + responseWithToken.data.loginUser.token;

      next();
    });
  });

  it('should return todos if logged in', async () => {
    query = `
        query getTodos {
            getTodos {
            _id
            title
            description
            time
            date
            alarm
            urgency
            completed
            }
        }
        `;
    const res = await apolloFetch({ query });

    expect(res.data.getTodos).toBeTruthy();
  });
});
