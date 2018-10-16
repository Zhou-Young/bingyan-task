const User = require('../models/user');
const Dynamic = require('../models/dynamic');
// signin
// 若数据库中没有用户名，则添加用户，若有用户名则判断密码是否正确
exports.signin = (req, res) => {
  const _user = req.body;
  const { name, password } = _user;
  console.log(name, password, _user);
  User.findOne({ name }, (err, user) => {
    console.log(user);
    if (err) {
      return console.log(err);
    }
    if (!user) {
      const newUser = new User({
        name,
        password,
        userImg: '../../static/images/default-user-pic.png',
        desc: 'no desc'
      });
      newUser.save();
      req.session.user = _user;
      res.json({
        success: true,
        message: '自动为此用户注册',
        data: name
      });
    } else if (user.password === password) {
      req.session.user = user;
      res.json({
        success: true,
        message: '登录成功',
        data: name
      });
    } else {
      res.json({
        success: false,
        message: '密码错误'
      });
    }
  });
};

exports.getUserInfo = (req, res) => {
  const { user } = req.session;
  if (!user) {
    res.json({
      success: false,
      message: '请先登陆',
      data: 12321
    });
  } else {
    const { name } = user;
    User.findOne({ name }, { password: 0 }, (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        res.json({
          success: false,
          message: '找不到用户'
        });
      } else {
        res.json({
          success: true,
          data: user
        });
      }
    });
  }
};

exports.getUserList = (req, res) => {
  User.find((err, user) => {
    if (err) {
      console.log(err);
    }
    res.json({
      success: true,
      data: user
    });
  });
};

// logout
exports.logout = (req, res) => {
  delete req.session.user;
  // res.location("/");
  // res.statusCode = 301;
  // res.redirect('/');
  res.json({
    success: true,
    message: 'logout'
  });
};

exports.addLikes = (req, res) => {
  const { id } = req.body;
  const { user } = req.session;
  User.find({ name: user.name, likes: { $in: id } }).exec((err, doc) => {
    if (err) {
      console.log(err);
    }
    if (doc.length > 0) {
      User.update({ name: user.name }, { $pull: { likes: id } }, err => {
        if (err) {
          console.log(err);
        } else {
          Dynamic.update({ _id: id }, { $pull: { likes: user.name } }, err => {
            if (err) {
              console.log(err);
            } else {
              res.json({
                success: true
              });
            }
          });
        }
      });
    } else {
      User.update({ name: user.name }, { $push: { likes: id } }, err => {
        if (err) {
          console.log(err);
        } else {
          Dynamic.update({ _id: id }, { $push: { likes: user.name } }, (err, raw) => {
            if (err) {
              console.log(err);
            } else {
              res.json({
                success: true,
                data: raw
              });
            }
          });
        }
      });
    }
  });
};

exports.addFollows = (req, res) => {
  const { author } = req.body;
  const { user } = req.session;
  if (author !== user.name) {
    User.find({ name: user.name, follows: { $in: author } }).exec((err, doc) => {
      if (err) {
        console.log(err);
      }
      if (doc.length > 0) {
        User.update({ name: user.name }, { $pull: { follows: author } }, err => {
          if (err) {
            console.log(err);
          } else {
            User.update({ name: author }, { $pull: { fans: user.name } }, err => {
              if (err) {
                console.log(err);
              } else {
                Dynamic.update({ author }, { $pull: { follows: user.name } }, (err, raw) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json({
                      success: true,
                      data: raw
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        User.update({ name: user.name }, { $push: { follows: author } }, err => {
          if (err) {
            console.log(err);
          } else {
            User.update({ name: author }, { $push: { fans: user.name } }, err => {
              if (err) {
                console.log(err);
              } else {
                Dynamic.update({ author }, { $push: { follows: user.name } }, (err, raw) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json({
                      success: true,
                      data: raw
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
};

exports.getFollows = (req, res) => {
  const { user } = req.session;
  User.find({ fans: { $in: user.name } }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        success: true,
        data: doc
      });
    }
  });
};

exports.getLikes = (req, res) => {
  const { user } = req.session;
  Dynamic.find({ likes: { $in: user.name } }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        success: true,
        data: doc
      });
    }
  });
};
