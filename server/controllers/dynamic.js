// const mongoose = require('mongoose')
// const Dynamic = mongoose.model('Dynamic')

var Dynamic = require('../models/dynamic');



exports.getDynamicList =  function (req, res) {
  const keyword = req.query.keyword;
  const reg = new RegExp(keyword, 'i') //不区分大小写
  Dynamic.find({"$or" :  [ //多条件，数组
    {author : {$regex : reg}},
    {content : {$regex : reg}},
    {title : {$regex : reg}},
    {desc : {$regex : reg}}
    ] 
  }).sort("-meta.createAt").exec(function(err,dynamic){
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
  const _name = req.session.user.name;
  Dynamic.find({author: _name}, function(err,dynamic){
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
