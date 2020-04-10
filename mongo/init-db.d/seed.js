printjson({ message: 'I am here' });
db.users.drop();
db.todos.drop();

db.users.insertMany([
  {
    email: 'test@test.ru',
    password: '123456789',
  },
]);
db.todos.insertMany([
  {
    title: 'My first todo',
    description: 'and description',
    completed: false,
    date: 'Wednesday, April 8',
    time: 5,
    alarm: 5,
    urgency: 'neutral',
    user: db.users.find({}, { _id: 1 }).map(function (item) {
      return item._id;
    })[0],
  },
  {
    title: 'Do this',
    description: 'and that',
    completed: false,
    date: 'Wednesday, April 8',
    time: 800,
    alarm: 5,
    urgency: 'normal',
    user: db.users.find({}, { _id: 1 }).map(function (item) {
      return item._id;
    })[0],
  },
  {
    title: 'My second todo',
    description: 'and description too',
    completed: false,
    date: 'Thursday, April 9',
    time: 1300,
    alarm: 5,
    urgency: 'important',
    user: db.users.find({}, { _id: 1 }).map(function (item) {
      return item._id;
    })[0],
  },
  {
    title: 'My third todo',
    description: 'aaand description',
    completed: false,
    date: 'Friday, April 10',
    time: 5,
    alarm: 5,
    urgency: 'important',
    user: db.users.find({}, { _id: 1 }).map(function (item) {
      return item._id;
    })[0],
  },
]);
db.users.findOneAndUpdate(
  { email: 'test@test.ru' },
  {
    $set: {
      todos: db.todos.find({}, { _id: 1 }).map(function (item) {
        return item._id;
      }),
    },
  }
);
