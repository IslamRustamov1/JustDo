const seeder = require('mongoose-seed');

const db = 'mongodb://todo-db:27017';

const data = [
  {
    model: 'User',
    documents: [
      {
        _id: 111111111111,
        email: 'test@test.ru',
        password: '123456789',
        todos: [222222222222, 333333333333, 444444444444, 555555555555],
      },
    ],
  },
  {
    model: 'Todo',
    documents: [
      {
        _id: 222222222222,
        title: 'My first todo',
        description: 'and description',
        completed: false,
        date: 'Wednesday, April 8',
        time: 5,
        alarm: 5,
        urgency: 'neutral',
        user: 111111111111,
      },
      {
        _id: 555555555555,
        title: 'Do this',
        description: 'and that',
        completed: false,
        date: 'Wednesday, April 8',
        time: 800,
        alarm: 5,
        urgency: 'normal',
        user: 111111111111,
      },
      {
        _id: 333333333333,
        title: 'My second todo',
        description: 'and description too',
        completed: false,
        date: 'Thursday, April 9',
        time: 1440,
        alarm: 5,
        urgency: 'important',
        user: 111111111111,
      },
      {
        _id: 444444444444,
        title: 'My third todo',
        description: 'aaand description',
        completed: false,
        date: 'Friday, April 10',
        time: 5,
        alarm: 5,
        urgency: 'important',
        user: 111111111111,
      },
    ],
  },
];

seeder.connect(db, () => {
  seeder.loadModels([
    './models/userModel.js',
    './models/todoModel.js',
    './models/urgencyModel.js',
  ]);

  seeder.clearModels(['User', 'Todo', 'Urgency'], () => {
    seeder.populateModels(data, (err) => {
      if (err) {
        console.log(err);
      }
      seeder.disconnect();
    });
  });
});
