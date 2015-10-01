'use strict';

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // set our port

// connect to database
// mongoose.connect(process.env.PROD_MONGODB);
mongoose.connect(process.env.MONGODB);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use('/api', require('./app/routes'));
app.use('/static', express.static('public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
