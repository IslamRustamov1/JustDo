const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefinitions/index');
const resolvers = require('./resolvers/index');

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

mongoose.connect('mongodb://todo-db:27017', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on('error', (error) => console.log(error));

const db = mongoose.connection;

!db
  ? console.log('Error connecting db')
  : console.log('Db connected successfully');

server.listen({ port: 3000 });
console.log('Server running at ', 3000);
