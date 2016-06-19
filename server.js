var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var yelp = require('node-yelp');
var url = require('url')
var passport = require('passport');
var session = require('express-session');

require('dotenv').config();

var client = yelp.createClient({
  oauth: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET
  }
});

// start server configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

app.get('/api/search', (req, res) => {
  var query = url.parse(req.url,true).query;
  client.search({term: 'bar', location: query.location || 'Paris', sort: 2})
  .then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 3000, function () {
  const port = process.env.PORT || 3000;
  console.log('Example app listening on port '+port);
});
