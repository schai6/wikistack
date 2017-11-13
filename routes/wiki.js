var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
  Page.findAll()
  .then(function(pages) {
    console.log(pages);
    res.render('../views/index.html', {pages});
  })
  .catch(next);
});

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(data => res.redirect(data.route))
  .catch(next);
  // -> after save -> res.redirect('/');
});

router.get('/add/', (req, res) => {
  res.render('addpage');
})

router.get('/:url', (req,res, next) => {
  Page.findOne( { where: { urlTitle: req.params.url } } )
  .then( function (foundPage) {
    res.render('wikipage', foundPage.dataValues);
  })
  .catch(next);
})
