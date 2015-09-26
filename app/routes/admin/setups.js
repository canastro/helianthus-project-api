var express = require('express');
var router = express.Router();
var Setup = require('../../models/setup');

// on routes that end in /tags
// ----------------------------------------------------
router.route('/setups')

    // get all the categories (accessed at GET http://localhost:8080/api/admin/setups)
    .get(function(req, res) {
        Setup.find(function(err, setups) {
            if (err) {
                res.send(err);
            }

            res.json(setups);
        });
    });

module.exports = router;
