// const mongoose = require('mongoose')
// const Dynamic = mongoose.model('Dynamic')

var Dynamic = require('../models/dynamic');



exports.getDynamicList =  function (req, res) {
  // const newdy = new Dynamic({title: "name",content: "password", img: ["../../static/images/default-user-pic.png"]})
  // newdy.save();
  Dynamic.find(function(err,dynamic){
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
