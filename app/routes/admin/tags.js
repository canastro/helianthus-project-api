var express = require('express');
var router = express.Router();
var Tag = require('../../models/tag');

// on routes that end in /tags
// ----------------------------------------------------
router.route('/tags')

    // create a tag (accessed at POST http://localhost:8080/api/tags)
    .post(function(req, res) {

        var tag = new Tag();      // create a new instance of the Tag model
        tag.name = req.body.name;  // set the tags name (comes from the request)

        // save the tag and check for errors
        tag.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Tag created!' });
        });

    });

router.route('/tags/:tag_id')
     // update the tag with this id (accessed at PUT http://localhost:8080/api/tags/:tag_id)
    .put(function(req, res) {

        // use our tag model to find the tag we want
        Tag.findById(req.params.tag_id, function(err, tag) {

            if (err) {
                res.send(err);
            }

            tag.name = req.body.name;  // update the tags info

            // save the tag
            tag.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Tag updated!' });
            });

        });
    });

module.exports = router;
