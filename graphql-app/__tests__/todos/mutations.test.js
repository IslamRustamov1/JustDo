const { createApolloFetch } = require('apollo-fetch');
const { ApolloServer } = require('apollo-server');

const {
  CREATE_TODO,
  UPDATE_TODO,
  DEFAULT_TODO,
} = require('../helpers/constants');
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

const uri = 'http://localhost:3002/graphql';

server.listen(3002);

const apolloFetch = createApolloFetch({ uri });

let variables;
let query;

describe('Todo features', () => {
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

  it('should return title of todo if created', async () => {
    query = CREATE_TODO;

    variables = DEFAULT_TODO;

    const res = await apolloFetch({ query, variables });

    expect(res.data.createTodo.title).toEqual('123');
  });

  describe('Delete todo feature', () => {
    beforeEach(async () => {
      query = CREATE_TODO;

      variables = DEFAULT_TODO;

      const createdTodo = await apolloFetch({ query, variables });

      query = `
            mutation deleteTodo($todoId: String!) {
                deleteTodo(todoId: $todoId) {
                message
                }
            }
            `;

      variables = {
        todoId: createdTodo.data.createTodo._id,
      };
    });

    it('should return message if todo deleted', async () => {
      const res = await apolloFetch({ query, variables });

      expect(res.data.deleteTodo.message).toEqual('Todo deleted!');
    });

    it('should return error if todo doesnt exist', async () => {
      variables = {
        todoId: '123456789123',
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

  describe('Update todo feature', () => {
    beforeEach(async () => {
      query = CREATE_TODO;

      variables = DEFAULT_TODO;

      const createdTodo = await apolloFetch({ query, variables });

      query = UPDATE_TODO;

      variables = Object.assign(
        { todoId: createdTodo.data.createTodo._id },
        DEFAULT_TODO
      );
    });

    it('should return message if todo updated', async () => {
      const res = await apolloFetch({ query, variables });

      expect(res.data.updateTodo.message).toEqual('Todo updated!');
    });
  });
});
