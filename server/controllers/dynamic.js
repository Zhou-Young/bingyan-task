// const mongoose = require('mongoose')
// const Dynamic = mongoose.model('Dynamic')

var Dynamic = require('../models/dynamic');



exports.getDynamicList =  function (req, res) {
  Dynamic.find().sort("meta.createAt").exec(function(err,dynamic){
    if (err) {
      console.log(err);
    }
    res.json({
        success: true,
        data: dynamic
    })
  })
}

exports.getMyDynamicList =  function (req, res) {
  // const newdy = new Dynamic({title: "name",content: "password", img: "../../static/images/default-img.png", author: "zhouY", userImg: "../../static/images/default-user-pic.png"});
  // newdy.save();
  const _name = req.session.user.name;
  console.log(_name,req.session.user);
  //
  Dynamic.find({author: _name}, function(err,dynamic){
    if (err) {
      console.log(err);
    }
    res.json({
        success: true,
        // message:'自动为此用户注册',
        data: dynamic
    })
  })
}

exports.publishDynamic =  function (req, res) {
  var _dynamic = req.body;
  const newdy = new Dynamic({title: _dynamic.title,content: _dynamic.content, img: "", author: _dynamic.name, userImg: _dynamic.userImg});
  newdy.save();
  res.json({
    success: true,
    // data: dynamic
  })
}
