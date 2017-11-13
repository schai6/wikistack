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
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(foundUser) {
    return Page.findAll({
      where: {
        authorId: foundUser.dataValues.id
      }
    }).then(foundPages => {
      res.render('userPage', {user: foundUser.dataValues,  pages: foundPages});
    })
  })
  .catch(next);
});