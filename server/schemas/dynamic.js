var mongoose = require('mongoose');

var DynamicSchema = new mongoose.Schema({

  title: String,
  content: String,
  img: Array,
})

module.exports = DynamicSchema;