// const mongoose = require('mongoose')
// const Dynamic = mongoose.model('Dynamic')

const Dynamic = require('../models/dynamic');
// const User = require('../models/user');

exports.getDynamicList = (req, res) => {
  const { keyword } = req.query;
  const reg = new RegExp(keyword, 'i'); // 不区分大小写
  const { name } = req.session.user;
  Dynamic.find({
    $or: [
      // 多条件，数组
      { author: { $regex: reg } },
      { content: { $regex: reg } },
      { title: { $regex: reg } },
      { desc: { $regex: reg } }
    ]
  })
    .sort('-updateTime')
    .exec((err, dynamic) => {
      if (err) {
        console.log(err);
      }
      if (dynamic.length > 0) {
        res.json({
          success: true,
          data: dynamic.map(v => {
            if (v.likes.indexOf(name) !== -1) {
              v.isLiked = true;
            } else {
              v.isLiked = false;
            }
            if (v.follows.indexOf(name) !== -1 || v.author === name) {
              v.isFollowed = true;
            } else {
              v.isFollowed = false;
            }
            return v;
          })
        });
      }
    });
};

exports.getMyDynamicList = (req, res) => {
  const { name } = req.session.user;
  Dynamic.find({ author: name })
    .sort('-updateTime')
    .exec((err, dynamic) => {
      if (err) {
        console.log(err);
      }
      res.json({
        success: true,
        data: dynamic
      });
    });
};

exports.publishDynamic = (req, res) => {
  const { title, content, name, userImg } = req.body;
  const newdy = new Dynamic({
    title,
    content,
    author: name,
    userImg
  });
  newdy.save();
  res.json({
    success: true
    // data: dynamic
  });
};

exports.deleteDynamic = (req, res) => {
  const { _id } = req.body;

  Dynamic.remove({ _id }, err => {
    if (err) {
      console.log(err);
    }
    res.json({
      success: true
    });
  });
};
