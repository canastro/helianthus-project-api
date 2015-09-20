var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Photo = require('../models/photo');
var Comment = require('../models/comment');
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
        Photo.findById(req.params.photo_id)
            .populate('category')
            .populate('tags')
            .populate('setup')
            .exec(function(err, photo) {
                if (err) {
                    res.send(err);
                }

                res.json(photo);
            });
    });

router.route('/photo/:photo_id/comment')

    // get the photo with that id (accessed at GET http://localhost:8080/api/photos/:photo_id)
    .get(function(req, res) {
        Comment.find({
            photo: req.params.photo_id
        }, function(err, comments) {
            if (err) {
                res.send(err);
            }

            res.json(comments);
        });
    })

    .post(function (req, res) {

        var comment = new Comment();
        comment.name = req.body.name;
        comment.message = req.body.message;
        comment.positionX = req.body.positionX;
        comment.positionY = req.body.positionY;
        comment.photo = mongoose.Types.ObjectId(req.body.photo._id);

        // save the comment and check for errors
        comment.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Comment created!' });
        });
    });


module.exports = router;
