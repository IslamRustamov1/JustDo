const { gql } = require('apollo-server');

module.exports = gql`
  type Todo {
    _id: ID!
    title: String!
    description: String
    urgency: String
    date: String!
    time: Int!
    alarm: Int!
    completed: Boolean!
  }

  type User {
    _id: ID!
    email: String!
    token: String!
  }

  type Urgency {
    _id: ID!
    name: String!
    color: String!
    level: Int!
  }

  type Message {
    message: String!
  }

  type Query {
    getTodos: [Todo]
    getUrgencies: [Urgency]
  }

  type Mutation {
    createUrgency(name: String!, color: String!, level: Int!): Urgency!

    deleteUrgency(urgencyId: String!): Message!

    createTodo(
      title: String!
      description: String
      urgency: String
      date: String!
      time: Int!
      alarm: Int!
      completed: Boolean!
    ): Todo!

    deleteTodo(todoId: String!): Message!

    updateTodo(
      todoId: String!
      title: String
      description: String
      urgency: String
      date: String
      time: Int
      alarm: Int
      completed: Boolean
    ): Message!

    loginUser(email: String!, password: String!): User!

    registerUser(email: String!, password: String!): User!

    sendResetLink(email: String!): Message!

    resetPassword(password: String!, resetPasswordCode: String!): Message!

    changePassword(previousPassword: String!, newPassword: String!): Message!
  }
`;
