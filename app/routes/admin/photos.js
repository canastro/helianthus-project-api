'use strict';

var Promise = require('bluebird');
var multiparty = require('multiparty');
var express = require('express');
var fs = Promise.promisifyAll(require('fs'));
var router = express.Router();
var Photo = require('../../models/photo');
var Comment = require('../../models/comment');

// on routes that end in /photos
// ----------------------------------------------------
router.route('/photos')

    // create a photo (accessed at POST http://localhost:8080/api/photos)
    .post(function(req, res) {

        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {

            // create a new instance of the Photo model
            var photo = new Photo();
            photo.name = fields.name[0];
            photo.title = fields.title[0];
            photo.description = fields.description[0];
            photo.story = fields.story[0];

            if (req.body.setup) {
                photo.setup = req.body.setup;
            }

            if (req.body.category) {
                photo.category = req.body.category;
            }

            if (req.body.tags) {
                photo.tags = req.body.tags;
            }

            var promise = new Promise(function (resolve, reject) {

                if (files && files.image[0]) {

                    return fs.readFileAsync(files.image[0].path)
                        .then(function (data) {
                            var newPath = './public/' + files.image[0].originalFilename;
                            return fs.writeFileAsync(newPath, data);
                        })
                        .then(resolve);
                }

                resolve();
            });

            promise
                .then(Promise.resolve(photo.save()))
                .then(function() {
                    res.status(201).json({ message: 'Photo created!' });
                })
                .catch(function(err) {
                    res.status(500).json({
                        err: err
                    });
                });
        });

    });

router.route('/photos/:photo_id')

     // update the photo with this id (accessed at PUT http://localhost:8080/api/photos/:photo_id)
    .put(function(req, res) {

        // use our photo model to find the photo we want
        Photo.findById(req.params.photo_id)
            .then(function(photo) {

                // update the photos info
                photo.name = req.body.name;

                // save the photo
                return Promise.resolve(photo.save());
            })
            .then(function() {
                res.status(200).json({ message: 'Photo updated!' });
            })
            .catch(function(err) {
                res.status(500).json({
                    err: err
                });
            });
    })

    .delete(function (req, res) {
        Promise.resolve(Photo.remove({_id: req.params.photo_id}).exec())
            .then(function() {
                res.status(204).json({ message: 'Photo removed!' });
            })
            .catch(function(err) {
                res.status(500).json({
                    err: err
                });
            });
    });

router.route('/photos/:photo_id/comments/:comment_id')
    .delete(function(req, res) {
        Promise.resolve(Comment.remove({_id: req.params.comment_id}).exec())
            .then(function() {
                res.status(204).json({ message: 'Comment removed!' });
            })
            .catch(function(err) {
                res.status(500).json({
                    err: err
                });
            });
    });

module.exports = router;
