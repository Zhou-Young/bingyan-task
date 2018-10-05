var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    me: String,
    meImg: String,
    other: String,
    otherImg: String,
    message: String,
    createAt: {
      type: Date,
      default: Date.now()
    }
})


module.exports = ChatSchema;