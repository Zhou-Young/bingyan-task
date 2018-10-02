var mongoose = require('mongoose');
var DynamicSchema = require('../schemas/dynamic');
var Dynamic = mongoose.model('Dynamic',DynamicSchema);

module.exports = Dynamic;