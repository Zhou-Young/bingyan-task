// var mongoose = require('mongoose')
// var User = mongoose.model('User')
var User = require('../models/user');
// signin
//若数据库中没有用户名，则添加用户，若有用户名则判断密码是否正确
exports.signin =  function (req, res) {
    const _user = req.body;
    const name = _user.name
    const password = _user.password   
    User.findOne({name: name}, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (!user) {
            const newUser = new User({name: name,password: password, userImg: "../../static/images/default-user-pic.png", desc:"no desc"})
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

exports.getUserList =  function (req, res) {
    User.find(function(err,user){
        if (err) {
            console.log(err);
        }
        res.json({
            success: true,
            data: user
        })
    })
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
