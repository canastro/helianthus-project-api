var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Category = require('./category');
var Tag = require('./tag');
var Setup = require('./setup');

var PhotoSchema = new Schema({
    name: String,
    title: String,
    description: String,
    story: String,
    likes: { type: Number, default: 0 },
    category: { type: ObjectId, ref: 'Category' },
    setup: { type: ObjectId, ref: 'Setup' },
    tags: [{ type: ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Photo', PhotoSchema);
