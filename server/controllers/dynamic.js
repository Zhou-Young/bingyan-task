// const mongoose = require('mongoose')
// const Dynamic = mongoose.model('Dynamic')

var Dynamic = require('../models/dynamic');
var User = require('../models/user');


exports.getDynamicList =  function (req, res) {
  const keyword = req.query.keyword;
  const reg = new RegExp(keyword, 'i') //不区分大小写
  const _name = req.session.user.name;
  const dynamic1 = [];
  Dynamic.find({"$or" :  [ //多条件，数组
    {author : {$regex : reg}},
    {content : {$regex : reg}},
    {title : {$regex : reg}},
    {desc : {$regex : reg}}
    ] 
  }).sort("-updateTime").exec(function(err,dynamic){
    if (err) {
      console.log(err);
    }
    if(dynamic.length > 0) {
      res.json({
        success: true,
        data: dynamic.map((v)=>{
          if(v.likes.indexOf(_name) != -1) {
            v.isLiked = true;
          }else {
            v.isLiked = false;
          }
          if(v.follows.indexOf(_name) != -1 || v.author == _name) {
            v.isFollowed = true;
          }else {
            v.isFollowed = false;
          }
          return v;
        })
    })
    }
  })
}



exports.getMyDynamicList =  function (req, res) {
  const _name = req.session.user.name;
  Dynamic.find({author: _name}).sort("-updateTime").exec(function(err,dynamic){
    if (err) {
      console.log(err);
    }
    res.json({
        success: true,
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

exports.deleteDynamic =  function (req, res) {
  var id= req.body._id;

  Dynamic.remove({_id:id},function(err){
    if (err) {
      console.log(err);
    }
    res.json({
        success: true,
    })
  })
}

