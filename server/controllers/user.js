// var mongoose = require('mongoose')
// var User = mongoose.model('User')
var User = require('../models/user');
// signin
//若数据库中没有用户名，则添加用户，若有用户名则判断密码是否正确
exports.signin =  function (req, res) {
    var _user = req.body;
    var name = _user.name
    var password = _user.password   
    console.log(name);
    User.findOne({name: name}, function (err, user) {
        console.log(user);
        if (err) {
            console.log(err)
        }
        if (!user) {
            var newUser = new User({name: name,password: password, img: "../../static/images/default-user-pic.png", desc:"no desc"})
            newUser.save();
            res.json({
                success: true,
                message:'自动为此用户注册'
            })
        }else {
            if(user.password == password) {
                res.json({
                    success: true,
                    message: '登录成功',
                })
            }else {
                res.json({
                    success: false,
                    message: '密码错误',
                })
            }
        }
    })
}

exports.gstUserInfo =  function (req, res) {
    
}
