var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Category = require('./category');
var Tag = require('./tag');
var Setup = require('./setup');
var Local = require('./local');

var PhotoSchema = new Schema({
    name: String,
    title: String,
    description: String,
    story: String,
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    local: { type: ObjectId, ref: 'Local' },
    category: { type: ObjectId, ref: 'Category' },
    setup: { type: ObjectId, ref: 'Setup' },
    tags: [{ type: ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Photo', PhotoSchema);
