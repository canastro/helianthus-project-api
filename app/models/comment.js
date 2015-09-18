var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Category = require('./category');
var Tag = require('./tag');
var Setup = require('./setup');

var CommentSchema = new Schema({
    name: String,
    message: String,
    positionX: Number,
    positionY: Number,
    photo: { type: ObjectId, ref: 'Photo' }
});

module.exports = mongoose.model('Comment', CommentSchema);
