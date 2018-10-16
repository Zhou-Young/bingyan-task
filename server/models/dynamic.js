const mongoose = require('mongoose');
const DynamicSchema = require('../schemas/dynamic');

const Dynamic = mongoose.model('Dynamic', DynamicSchema);

module.exports = Dynamic;
