var express = require('express');
var exphbs = require('express3-handlebars');
var path = require('path');
var fs = require('fs');

var highlight = require('./highlight');
var languages = require('./languages');

var app = express();

var randomName = function (length) {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  var name = '';
  for (var i = 0; i < length; i++) {
    var number = Math.floor(Math.random() * alphabet.length);
    name += alphabet[number];
  }

  return name;
};

var uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir))
  fs.mkdirSync(uploadsDir);

app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.use(express.compress());
app.use('/gist', express.static(path.join(__dirname, 'public')));

app.get('/gist', function (req, res) {
  res.render('home', {languages:languages});
});

app.get('/gist/:id.txt', function (req, res, next) {
  fs.readFile(path.join(uploadsDir, req.params.id), function (err, data) {
    if (err) 
      return next();

    var gist = JSON.parse(data);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(gist.contents);
  });
});

app.get('/gist/:id', function (req, res, next) {
  fs.readFile(path.join(uploadsDir, req.params.id), function (err, data) {
    if (err) 
      return next();

    var gist = JSON.parse(data);
    var highlighted = highlight(gist.contents, gist.language);

    res.render('gist', {css: highlighted.css, html: highlighted.html, language: gist.language, id: req.params.id});
  });
});

app.post('/gist/create', function (req, res) {
  var name = randomName(9);
  req.pipe(fs.createWriteStream(path.join(uploadsDir, name)));
  req.on('end', function () {
    res.send(name);
  });
});

app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ' + port);