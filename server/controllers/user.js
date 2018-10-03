// var mongoose = require('mongoose')
// var User = mongoose.model('User')
var User = require('../models/user');
// signin
//若数据库中没有用户名，则添加用户，若有用户名则判断密码是否正确
exports.signin =  function (req, res) {
    var _user = req.body;
    var name = _user.name
    var password = _user.password   
    User.findOne({name: name}, function (err, user) {
        // console.log(user);
        if (err) {
            console.log(err)
        }
        if (!user) {
            var newUser = new User({name: name,password: password, userImg: "../../static/images/default-user-pic.png", desc:"no desc"})
            newUser.save();
            req.session.user = _user;
            res.json({
                success: true,
                message:'自动为此用户注册',
                data: name,
            })
        }else {
            if(user.password == password) {
                req.session.user = user;
                res.json({
                    success: true,
                    message: '登录成功',
                    data: name,
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

exports.getUserInfo =  function (req, res) {
    const user = req.session.user;
    // console.log(req.session);
    // console.log(user);
    if (!user) {
        res.json({
            success: false,
            message:'请先登陆',
            data: 12321,
        })
    }else{
        const name = user.name;
        User.findOne({name: name}, function (err, user) {
            if (err) {
                console.log(err)
            }
            if (!user) {
                res.json({
                    success: false,
                    message:'找不到用户',
                })
            }else {
                res.json({
                    success: true,
                    data: {name: user.name,
                    userImg: user.userImg,
                    desc: user.desc,
                },
                })
            }
        })
    }

    
}

// logout
exports.logout = function (req, res) {
    delete req.session.user;
    // res.location("/");
    // res.statusCode = 301;
    // res.redirect('/');
    res.json({
        success: true,
        message:'logout',
    })
}
