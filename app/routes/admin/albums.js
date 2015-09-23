var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Album = require('../../models/album');
var Photo = require('../../models/photo');

// on routes that end in /albums
// ----------------------------------------------------
router.route('/albums')

    // create a album (accessed at POST http://localhost:8080/api/albums)
    .post(function(req, res) {

        var album = new Album();      // create a new instance of the Album model
        album.name = req.body.name;
        album.title = req.body.title;
        album.description = req.body.description;
        album.story = req.body.story;

        // save the album and check for errors
        album.save(function(err) {
            if (err) {
                res.status(500).json({
                    err: err
                });
            }

            res.status(201).json({ message: 'Album created!' });
        });

    });

//Add photo
router.route('/albums/:album_id')
    .put(function(req, res) {

        // use our album model to find the album we want
        var albumPromise = Album.findById(req.params.album_id).exec();
        var photoPromise = Photo.findById(req.body.photo_id).exec();

        Promise.all([albumPromise, photoPromise])
            .then(function (values) {

                values[0].photos.push(values[1]);
                return values[0].save();
            })
            .then(function () {

                res.status(200).json({ message: 'Album updated!' });
            })
            .catch(function (err) {

                res.status(500).json({
                    err: err
                });

                throw err;

            });

    });

module.exports = router;
