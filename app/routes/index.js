var mongoose = require('mongoose');
var Promise = require("bluebird");
var express = require('express');
var router = express.Router();

Promise.promisifyAll(mongoose);

router.use(require('./categories'));
router.use(require('./tags'));
router.use(require('./photos'));
router.use(require('./albums'));

router.use('/admin', require('./admin'));

router.get('/', function(req, res) {
  res.send('Home page');
});

router.get('/about', function(req, res) {
  res.send('Learn about us');
});

module.exports = router;
