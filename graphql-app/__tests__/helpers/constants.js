const gql = require('graphql-tag');

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      email
    }
  }
`;

const SEND_RESET_LINK = gql`
  mutation sendResetLink($email: String!) {
    sendResetLink(email: $email) {
      message
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation resetPassword($password: String!, $resetPasswordCode: String!) {
    resetPassword(password: $password, resetPasswordCode: $resetPasswordCode) {
      message
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation changePassword($previousPassword: String!, $newPassword: String!) {
    changePassword(
      previousPassword: $previousPassword
      newPassword: $newPassword
    ) {
      message
    }
  }
`;

const CREATE_URGENCY = `
    mutation createUrgency($name: String!, $color: String!, $level: Int!) {
      createUrgency(name: $name, color: $color, level: $level) {
        _id
        name
        color
        level
      }
    }
`;

const CREATE_TODO = `
    mutation createTodo(
        $title: String!
        $description: String
        $alarm: Int!
        $date: String!
        $time: Int!
        $urgency: String
        $completed: Boolean!
    ) {
        createTodo(
        title: $title
        description: $description
        alarm: $alarm
        date: $date
        time: $time
        urgency: $urgency
        completed: $completed
        ) {
        _id
        title
        }
    }
`;

const UPDATE_TODO = `
    mutation updateTodo(
        $todoId: String!
        $title: String!
        $description: String
        $alarm: Int!
        $date: String!
        $time: Int!
        $urgency: String
        $completed: Boolean!
    ) {
        updateTodo(
        todoId: $todoId
        title: $title
        description: $description
        alarm: $alarm
        date: $date
        time: $time
        urgency: $urgency
        completed: $completed
        ) {
        message
        }
    }
`;

const DEFAULT_TODO = {
  title: '123',
  description: '123',
  alarm: 5,
  date: '2012-02-02',
  time: 5,
  urgency: 'neutral',
  completed: false,
};

module.exports = {
  LOGIN_USER,
  REGISTER_USER,
  SEND_RESET_LINK,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  CREATE_TODO,
  UPDATE_TODO,
  CREATE_URGENCY,
  DEFAULT_TODO,
};
