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
            throw err;
        }

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
            return;
        }

        // check if password matches
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            return;
        }

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });

    });
});


module.exports = router;
