var mongoose = require('mongoose');

var DynamicSchema = new mongoose.Schema({

  title: String,
  content: String,
  img: Array,
  author: String,
  userImg: String
})

module.exports = DynamicSchema;