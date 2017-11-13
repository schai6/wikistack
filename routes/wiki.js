var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
  Page.findAll()
    .then(function (pages) {
      res.render('../views/index.html', { pages });
    })
    .catch(next);
});

router.post('/', function (req, res, next) {
  User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    })
    .then(values => {
      var user = values[0];
      var tags = req.body.tags.split(' ');
      // STUDENT ASSIGNMENT:
      // add definitions for `title` and `content`
      var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        tags: tags
      });

      // STUDENT ASSIGNMENT:
      // make sure we only redirect *after* our save is complete!
      // note: `.save` returns a promise or it can take a callback.
      return page.save().then(function (page) {
        return page.setAuthor(user);
      });
      // -> after save -> res.redirect('/');
    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);
});

router.get('/add/', (req, res) => {
  res.render('addpage');
});

router.get('/:url', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.url
    },
    include: [
      {model: User, as: 'author'}
    ]
  }).then(page => {
    var tags = page.tags.join(' ');
    if (page === null) {
      res.sendStatus(404);
    } else {
      res.render('wikipage', {
        page: page,
        tags: tags
      });
    }
  }).catch(next);
});
