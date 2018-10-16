const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  userImg: {
    type: String,
    default: '../../static/images/default-user-pic.png'
  },
  desc: {
    type: String,
    default: 'no desc'
  },
  likes: [],
  follows: [],
  fans: []
});

module.exports = UserSchema;
