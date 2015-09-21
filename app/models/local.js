var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LocalSchema = new Schema({
    country: String,
    city: String,
    latitude: { type: Number },
    longitude: { type: Number }
});

module.exports = mongoose.model('Local', LocalSchema);
