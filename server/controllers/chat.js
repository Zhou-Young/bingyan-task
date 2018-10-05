var Chat = require('../models/chat');

exports.getChatHistory =  function (req, res) {
  const me = req.query.me;
  const other = req.query.other;
  Chat.find({me: {$in:[me, other]}, other: {$in:[me, other]}},(err, chat)=>{
    if (err) {
      console.log(err);
    }else {
      res.json({
        success: true,
        data: chat.sort((a,b)=>{
          return a.createAt - b.createAt;
        })
      })
    }
  })
}

exports.sendChat =  function (req, res) {
  const message = req.body.message;
  const other = req.body.other;
  const me = req.body.me;
  const newChat = new Chat({message: message, me: me, other: other});
  newChat.save();
  res.json({
    success: true,
    message: '发送成功'
  })
}

