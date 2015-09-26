var express = require('express');
var router = express.Router();
var Setup = require('../../models/setup');

// on routes that end in /setups
// ----------------------------------------------------
router.route('/setups')

    // create a category (accessed at POST http://localhost:8080/api/admin/setups)
    .post(function(req, res) {

        var setup = new Setup();      // create a new instance of the Setup model
        setup.machine = req.body.machine;
        setup.focal_length = req.body.focal_length;
        setup.aperture = req.body.aperture;
        setup.exposure_time = req.body.exposure_time;
        setup.flash = req.body.flash;
        setup.iso = req.body.iso;

        // save the category and check for errors
        Promise.resolve(setup.save())
            .then(function () {
                res.status(201).json({
                    message: 'Setup created!'
                });
            })
            .catch(function (err) {
                res.status(500).json({
                    err: err
                });
            });
    })

    // get all the categories (accessed at GET http://localhost:8080/api/admin/setups)
    .get(function(req, res) {
        Setup.find(function(err, setups) {
            if (err) {
                res.send(err);
            }

            res.json(setups);
        });
    });

router.route('/setups/:setup_id')
     // update the setup with this id (accessed at PUT http://localhost:8080/api/setups/:setup_id)
    .put(function(req, res) {


        // use our category model to find the category we want
        Promise.resolve(Setup.findById(req.params.setup_id).exec())
            .then(function (setup) {

                if (!setup) {
                    return res.status(404).json({
                        err: 'Setup not found'
                    });
                }

                // update the categories info
                setup.name = req.body.name;

                return setup.save();
            })
            .then(function () {
                res.status(200).json({ message: 'Setup updated!' });
            })
            .catch(function (err) {
                res.status(500).json({
                    err: err
                });
            });
    })

    .delete(function (req, res) {
        Promise.resolve(Setup.remove({_id: req.params.setup_id}).exec())
            .then(function () {
                res.status(204).json({ message: 'Setup removed!' });
            })
            .catch(function (err) {
                res.status(500).json({
                    err: err
                });
            })
    });

module.exports = router;
