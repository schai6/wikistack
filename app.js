'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./models');
var router = require('./routes');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
app.use("/", router);

models.db.sync({})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(1337, function(){
      console.log('listening on port 1337');
    });
})
.catch(function (error) {
  console.error(error.stack);
});

app.use(express.static(path.join(__dirname, '/public')));
