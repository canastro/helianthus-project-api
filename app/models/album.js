var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Photo = require('./photo');

var AlbumSchema = new Schema({
    name: String,
    title: String,
    description: String,
    story: String,
    photos: [{ type: ObjectId, ref: 'Photo' }]
});

module.exports = mongoose.model('Album', AlbumSchema);
