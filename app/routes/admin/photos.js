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
        photo.category = req.body.category;
        photo.tags = req.body.tags;

        // save the photo and check for errors
        photo.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Photo created!' });
        });

    });

router.route('/photos/:photo_id')
     // update the photo with this id (accessed at PUT http://localhost:8080/api/photos/:photo_id)
    .put(function(req, res) {

        // use our photo model to find the photo we want
        Photo.findById(req.params.photo_id, function(err, photo) {

            if (err) {
                res.send(err);
            }

            photo.name = req.body.name;  // update the photos info

            // save the photo
            photo.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Photo updated!' });
            });

        });
    });

module.exports = router;
