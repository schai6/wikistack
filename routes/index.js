var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');

module.exports = router;
router.use('/wiki', wikiRouter);
router.use('/users', userRouter);
