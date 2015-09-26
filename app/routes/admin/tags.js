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
        Promise.resolve(tag.save())
            .then(function () {
                res.status(201).json({
                    message: 'Tag created!'
                });
            })
            .catch(function (err) {
                res.status(500).json({
                    err: err
                });
            });

    });

router.route('/tags/:tag_id')
     // update the tag with this id (accessed at PUT http://localhost:8080/api/tags/:tag_id)
    .put(function(req, res) {


        // use our category model to find the category we want
        Promise.resolve(Tag.findById(req.params.tag_id).exec())
            .then(function (tag) {

                if (!tag) {
                    return res.status(404).json({
                        err: 'Tag not found'
                    });
                }

                // update the categories info
                tag.name = req.body.name;

                return tag.save();
            })
            .then(function () {
                res.status(200).json({ message: 'Tag updated!' });
            })
            .catch(function (err) {
                res.status(500).json({
                    err: err
                });
            });
    })

    .delete(function (req, res) {
        Promise.resolve(Tag.remove({_id: req.params.tag_id}).exec())
            .then(function () {
                res.status(204).json({ message: 'Tag removed!' });
            })
            .catch(function (err) {
                res.status(500).json({
                    err: err
                });
            })
    });

module.exports = router;
