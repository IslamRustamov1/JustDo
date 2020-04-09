const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordCode: {
    type: String,
    required: false,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  urgencies: [{ type: Schema.Types.ObjectId, ref: 'Urgency' }],
});

module.exports = model('User', userSchema);
