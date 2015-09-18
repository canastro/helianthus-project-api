var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SetupSchema = new Schema({
    machine: String,
    focal_length: String,
    aperture: String,
    exposure_time: String,
    iso: Number
});

module.exports = mongoose.model('Setup', SetupSchema);
