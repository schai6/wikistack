var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll()
    .then(function (users) {
      res.render('userIndex', {users} );
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  var userPromise = User.findById(req.params.id);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('userPage', { user: user, pages: pages });
  })
  .catch(next);
});
