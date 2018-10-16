const mongoose = require('mongoose');
const ChatSchema = require('../schemas/chat');

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
