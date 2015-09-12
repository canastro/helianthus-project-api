var express = require('express');
var router = express.Router();
var authorize = require('../../middlewares/authorize');

router.use(require('./authentication'));
router.use(authorize);
router.use(require('./users'));
router.use(require('./categories'));
router.use(require('./tags'));
router.use(require('./photos'));

module.exports = router;
