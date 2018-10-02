// 模型Model是根据Schema编译出的构造器，或者称为类，
// 通过Model可以实例化出文档对象document

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User',UserSchema);

module.exports = User;