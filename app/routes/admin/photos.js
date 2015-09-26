var express = require('express');
var router = express.Router();
var Photo = require('../../models/photo');

// on routes that end in /photos
// ----------------------------------------------------
router.route('/photos')

    // create a photo (accessed at POST http://localhost:8080/api/photos)
    .post(function(req, res) {

        var photo = new Photo();      // create a new instance of the Photo model
        photo.name = req.body.name;
        photo.title = req.body.title;
        photo.description = req.body.description;
        photo.story = req.body.story;

        if (req.body.setup) {
            photo.setup = req.body.setup;
        }

        if (req.body.category) {
            photo.category = req.body.category;
        }

        if (req.body.tags) {
            photo.tags = req.body.tags;
        }

        // save the photo and check for errors
        Promise.resolve(photo.save())
            .then(function () {
                res.status(201).json({ message: 'Photo created!' });
            })
            .catch(function(err) {
                res.status(500).json({
                    err: err
                });
            });

    });

router.route('/photos/:photo_id')
     // update the photo with this id (accessed at PUT http://localhost:8080/api/photos/:photo_id)
    .put(function(req, res) {

        // use our photo model to find the photo we want
        Photo.findById(req.params.photo_id)
            .then(function (photo) {

                // update the photos info
                photo.name = req.body.name;

                // save the photo
                return Promise.resolve(photo.save());
            })
            .then(function () {
                res.status(200).json({ message: 'Photo updated!' });
            })
            .catch(function(err, photo) {
                res.status(500).json({
                    err: err
                });
            });
    });

module.exports = router;
