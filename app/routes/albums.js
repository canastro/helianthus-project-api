var express = require('express');
var router = express.Router();
var Album = require('../models/album');

// on routes that end in /albums
// ----------------------------------------------------
router.route('/albums')

    .get(function(req, res) {
        Album.find(function(err, albums) {
            if (err) {
                res.send(err);
            }

            res.json(albums);
        });
    });


// on routes that end in /albums/:album_id
// ----------------------------------------------------
router.route('/album/:album_id')

    .get(function(req, res) {
        Album.findById(req.params.album_id, function(err, album) {
            if (err) {
                res.send(err);
            }

            res.json(album);
        });
    });


module.exports = router;
