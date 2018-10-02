const User = require('../controllers/user');
const Dynamic = require('../controllers/dynamic');

module.exports = function(server) {

  // pre handle user
  // server.use(function(req, res, next) {
  //   var _user = req.session.user

  //   server.locals.user = _user

  //   next()
  // })

  // User
  server.post('/user/signin', User.signin);
  server.get('/user/getUserInfo', User.signin);

  //home
  server.get('/home/getDynamicList', Dynamic.getDynamicList);


}