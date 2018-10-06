const User = require('../controllers/user');
const Dynamic = require('../controllers/dynamic');
const Chat = require('../controllers/chat');
// const Index = require('../controllers/index')

module.exports = function(server) {

  // pre handle user
  server.use(function(req, res, next) {
    var _user = req.session

    server.locals.user = _user

    next()
  })

  // Index
  // server.get('/', Index.index)

  // User
  server.post('/user/signin', User.signin);
  server.post('/user/addLikes', User.addLikes);
  server.post('/user/addFollows', User.addFollows);
  // server.post('/user/deleteLikes', User.addLikes);
  // server.post('/user/deleteFollows', User.addFollows);
  server.get('/user/getFollows', User.getFollows);
  server.get('/user/getLikes', User.getLikes);
  server.get('/user/logout', User.logout);
  server.get('/user/getUserInfo', User.getUserInfo);
  server.get('/user/getUserList', User.getUserList);

  //home
  server.get('/home/getDynamicList', Dynamic.getDynamicList);
  server.get('/home/getMyDynamicList', Dynamic.getMyDynamicList);
  server.post('/home/publishDynamic', Dynamic.publishDynamic); 

  server.post('/home/deleteDynamic', Dynamic.deleteDynamic);

  //chat
  server.get('/chat/getChatHistory', Chat.getChatHistory);
  server.post('/chat/sendChat', Chat.sendChat);

  
  


}