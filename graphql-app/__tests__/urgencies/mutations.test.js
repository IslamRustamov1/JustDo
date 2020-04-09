const { createApolloFetch } = require('apollo-fetch');
const { ApolloServer } = require('apollo-server');

const { CREATE_URGENCY } = require('../helpers/constants');
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

const uri = 'http://localhost:3005/graphql';

server.listen(3005);

const apolloFetch = createApolloFetch({ uri });

let variables;
let query;

describe('Urgency mutations', () => {
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

  it('should return name of urgency if created', async () => {
    query = CREATE_URGENCY;

    variables = {
      name: 'new filter',
      level: 5,
      color: '#12345',
    };

    const res = await apolloFetch({ query, variables });

    expect(res.data.createUrgency.name).toEqual('new filter');
  });

  describe('Delete urgency feature', () => {
    beforeEach(async () => {
      query = CREATE_URGENCY;

      variables = {
        name: 'new filter',
        level: 5,
        color: '#12345',
      };

      const createdUrgency = await apolloFetch({ query, variables });

      query = `
            mutation deleteUrgency($urgencyId: String!) {
                deleteUrgency(urgencyId: $urgencyId) {
                message
                }
            }
            `;

      variables = {
        urgencyId: createdUrgency.data.createUrgency._id,
      };
    });

    it('should return message if urgency deleted', async () => {
      const res = await apolloFetch({ query, variables });

      expect(res.data.deleteUrgency.message).toEqual('Urgency deleted!');
    });

    it('should return error if urgency doesnt exist', async () => {
      variables = {
        urgencyId: '123456789123',
      };
      const res = await apolloFetch({ query, variables });

      expect(res.errors).toBeTruthy();
    });

    it('should return error if not authorized', async () => {
      apolloFetch.use(({ request, options }, next) => {
        if (!options.headers) {
          options.headers = {}; // Create the headers object if needed.
        }
        options.headers['authorization'] = 'Bearer ' + 123;

        next();
      });
      const res = await apolloFetch({ query, variables });

      expect(res.errors).toBeTruthy();
    });
  });
});
