var express = require('express');
var router = express.Router();
var User = require('../../models/user');
// Load the bcrypt module
var bcrypt = require('bcrypt');

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

    // create a user (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {

        var hash;
        var user = new User();      // create a new instance of the Bear model

        hash = bcrypt.hashSync(req.body.password, 10);

        user.username = req.body.username;
        user.password = hash;

        // save the user and check for errors
        user.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'User created!' });
        });

    });

module.exports = router;
