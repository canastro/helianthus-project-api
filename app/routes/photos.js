var express = require('express');
var router = express.Router();
var Photo = require('../models/photo');
var Category = require('../models/category');

// on routes that end in /photos
// ----------------------------------------------------
router.route('/photos')

    // get all the photos (accessed at GET http://localhost:8080/api/photos)
    .get(function(req, res) {
        Photo.find()
            .populate('category')
            .populate('tags')
            .exec(function(err, photos) {
                if (err) {
                    res.send(err);
                }

                res.json(photos);
            });
    });


// on routes that end in /photos/:photo_id
// ----------------------------------------------------
router.route('/photo/:photo_id')

    // get the photo with that id (accessed at GET http://localhost:8080/api/photos/:photo_id)
    .get(function(req, res) {
        Photo.findById(req.params.photo_id, function(err, photo) {
            if (err) {
                res.send(err);
            }

            res.json(photo);
        });
    });


module.exports = router;
