var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Photo = require('./photo');

var CommentSchema = new Schema({
    name: String,
    message: String,
    left: Number,
    top: Number,
    photo: { type: ObjectId, ref: 'Photo' }
});

module.exports = mongoose.model('Comment', CommentSchema);
