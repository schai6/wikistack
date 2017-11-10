var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  res.send('Get pages');
})

router.post('/', (req, res) => {
  res.send('new page');
})

router.get('/add/', (req, res) => {
  res.send('add a page form')
})