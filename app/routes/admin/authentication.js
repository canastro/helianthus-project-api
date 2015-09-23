var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var config = require('../../../config'); // get our config file
var router = express.Router();
var User = require('../../models/user');
// Load the bcrypt module
var bcrypt = require('bcrypt');

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) {
            return res.status(500).json({
                err: err
            });
        }

        if (!user) {
            return res.status(404).json({
                err: 'Authentication failed. User not found.'
            });
        }

        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {

            var token;

            if (err) {
                return res.status(500).json({
                    err: err
                });
            }

            if (!isMatch) {
                return res.status(401).json({
                    err: 'Authentication failed. Wrong password.'
                });
            }

            // if user is found and password is right
            // create a token
            token = jwt.sign(user, config.secret, {
                expiresInMinutes: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.status(200).json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        });

    });
});


module.exports = router;
