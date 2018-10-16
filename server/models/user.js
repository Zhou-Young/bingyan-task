// 模型Model是根据Schema编译出的构造器，或者称为类，
// 通过Model可以实例化出文档对象document

const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

const User = mongoose.model('User', UserSchema);

module.exports = User;
