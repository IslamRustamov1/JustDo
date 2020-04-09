const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { AuthenticationError } = require('apollo-server');

const Todo = require('../models/todoModel');
const { SECRET } = require('../config');

const getUser = async (authorization) => {
  if (!authorization) throw new AuthenticationError('You have to login first');

  const token = authorization.split('Bearer ')[1];
  if (!token) throw new AuthenticationError('No token provided');

  const user = await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) throw new AuthenticationError('Invalid token');
    return decoded;
  });
  return user;
};

module.exports = {
  Query: {
    async getTodos(_, __, { authorization }) {
      const user = await getUser(authorization);

      if (user) {
        try {
          const todos = await Todo.find({ user: user.id });

          return todos;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
  },

  Mutation: {
    async createTodo(
      _,
      { title, description, urgency, alarm, time, date, completed },
      { authorization }
    ) {
      const user = await getUser(authorization);

      if (user) {
        try {
          const newTodo = new Todo();

          newTodo.title = title;
          newTodo.description = description;
          newTodo.urgency = urgency;
          newTodo.alarm = alarm;
          newTodo.time = time;
          newTodo.date = date;
          newTodo.completed = completed;
          newTodo.user = user.id;

          const todo = await newTodo.save();

          return todo;
        } catch (err) {
          throw new Error(err);
        }
      }
    },

    async deleteTodo(_, { todoId }, { authorization }) {
      const user = await getUser(authorization);
      try {
        const todo = await Todo.findById(mongoose.Types.ObjectId(todoId));
        if (todo) {
          if (todo.user.toString() === user.id) {
            await todo.delete();
          } else throw new AuthenticationError('You cannot delete this todo');
        } else throw new Error('Todo is not found');
        return { message: 'Todo deleted!' };
      } catch (err) {
        throw new Error(err);
      }
    },

    async updateTodo(
      _,
      { todoId, title, description, urgency, alarm, time, date, completed },
      { authorization }
    ) {
      const user = await getUser(authorization);

      try {
        const todo = await Todo.findById(mongoose.Types.ObjectId(todoId));

        if (todo) {
          if (todo.user.toString() === user.id) {
            todo.title = title;
            todo.description = description;
            todo.urgency = urgency;
            todo.alarm = alarm;
            todo.time = time;
            todo.date = date;
            todo.completed = completed;

            await todo.save();
            return { message: 'Todo updated!' };
          } else {
            throw new AuthenticationError('You cannot update this todo');
          }
        } else {
          return 'Todo does not exist';
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
