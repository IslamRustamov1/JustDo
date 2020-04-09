const { model, Schema } = require('mongoose');

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  alarm: {
    type: Number,
    required: true,
  },
  urgency: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Export Todo model
module.exports = model('Todo', todoSchema);
