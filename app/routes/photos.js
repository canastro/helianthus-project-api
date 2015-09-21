var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var extend = require('extend');

var Photo = require('../models/photo');
var Comment = require('../models/comment');
var Category = require('../models/category');

// on routes that end in /photos
// ----------------------------------------------------
router.route('/photos')

    // get all the photos (accessed at GET http://localhost:8080/api/photos)
    .get(function(req, res) {

        var from;
        var to;
        var options = {
            per_page: 12,
            page: 1
        };

        options = extend(options, req.query);
        options.per_page = Number(options.per_page);
        options.page = Number(options.page);

        from = (options.page - 1) * options.per_page;
        to = options.per_page + 1;

        Photo.find()
            .skip(from)
            .limit(to)
            .populate('category')
            .populate('tags')
            .exec(function(err, photos) {

                var hasMore = false;
                if (err) {
                    res.send(err);
                }

                hasMore = photos.length > options.per_page;

                if (hasMore) {
                    photos = photos.slice(0, options.per_page);
                }

                res.json({
                    hasMore: hasMore,
                    photos: photos
                });
            });
    });



router.route('/photos/count')
    .get(function (req, res) {
        Photo.count()
            .exec(function(err, result) {

                if (err) {
                    res.send(err);
                }

                res.json(result);
            });
    });

// on routes that end in /photos/:photo_id
// ----------------------------------------------------
router.route('/photo/:photo_id')

    //TODO: load comments?
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
