var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    userImg: String,
    desc: String,
})

UserSchema.statics = {
    //取出数据库所有数据，
    fetch: function(cb) {
      return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb)
    },
    //查询单条数据
    findById: function(id, cb) {
      return this
        .findOne({_id: id})
        .exec(cb)
    }
  }

module.exports = UserSchema;