var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/wiki/', (req, res) => {
  res.send('Get pages');
})

router.post('/wiki/', (req, res) => {
  res.send('new page');
})

router.get('/wiki/add/', (req, res) => {
  res.send('add a page form')
})