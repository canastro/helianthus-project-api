'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AlbumSchema = new Schema({
    name: String,
    title: String,
    description: String,
    story: String,
    photos: [{ type: ObjectId, ref: 'Photo' }],
    isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('Album', AlbumSchema);
