const Chat = require('../models/chat');

exports.getChatHistory = (req, res) => {
  const { me, other } = req.query;
  Chat.find({ me: { $in: [me, other] }, other: { $in: [me, other] } }, (err, chat) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        success: true,
        data: chat.sort((a, b) => a.createAt - b.createAt)
      });
    }
  });
};

exports.sendChat = (req, res) => {
  const { message, other, me } = req.body;
  const newChat = new Chat({ message, me, other });
  newChat.save();
  res.json({
    success: true,
    message: '发送成功'
  });
};
