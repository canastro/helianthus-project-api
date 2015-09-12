var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');

// on routes that end in /bears
// ----------------------------------------------------
router.route('/tags')

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Tag.find(function(err, bears) {
            if (err) {
                res.send(err);
            }

            res.json(bears);
        });
    });


// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/tag/:tag_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Tag.findById(req.params.tag_id, function(err, bear) {
            if (err) {
                res.send(err);
            }

            res.json(bear);
        });
    });


module.exports = router;
