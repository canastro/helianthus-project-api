var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Category = require('./category');
var Tag = require('./tag');

var PhotoSchema = new Schema({
    name: String,
    title: String,
    description: String,
    category: { type: ObjectId, ref: 'Category' },
    tags: [{ type: ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Photo', PhotoSchema);
