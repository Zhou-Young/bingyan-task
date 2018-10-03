var mongoose = require('mongoose');

var DynamicSchema = new mongoose.Schema({

  title: String,
  content: String,
  img: Array,
  author: String,
  userImg: String,
  meta: {
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
}
})

DynamicSchema.pre('save', function(next) {
  if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
      this.meta.updateAt = Date.now();
  }

  next();
});

module.exports = DynamicSchema;