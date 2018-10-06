var mongoose = require('mongoose');

var DynamicSchema = new mongoose.Schema({

  title: String,
  content: String,
  img: Array,
  author: String,
  userImg: String,
  likes: Array,
  follows: Array,
  isLiked: {
      type: Boolean,
      default: false
  },
  isFollowed: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});


module.exports = DynamicSchema;