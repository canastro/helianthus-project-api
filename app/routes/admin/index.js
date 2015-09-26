var express = require('express');
var router = express.Router();
var authorize = require('../../middlewares/authorize');

router.use(require('./authentication'));
router.use(authorize);
router.use(require('./categories'));
router.use(require('./tags'));
router.use(require('./photos'));
router.use(require('./albums'));
router.use(require('./setups'));

module.exports = router;
