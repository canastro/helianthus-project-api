var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file

// middleware to use for all requests
// route middleware to verify a token
module.exports = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        return jwt.verify(token, config.secret, function(err, decoded) {

            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }

            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        });

    }

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
};
