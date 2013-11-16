var express = require('express');
var exphbs = require('express3-handlebars');
var path = require('path');
var fs = require('fs');

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

var languages = [
  {name:'C++',        mode:'c_cpp'},
  {name:'CSS',        mode:'css'},
  {name:'HTML',       mode:'html'},
  {name:'JavaScript', mode:'javascript'},
  {name:'Perl',       mode:'perl'},
  {name:'Python',     mode:'python'},
  {name:'Ruby',       mode:'ruby'},
  {name:'Shell',      mode:'sh'},
  {name:'SQL',        mode:'sql'},
  {name:'Text',       mode:'text'}
];

var uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir))
  fs.mkdirSync(uploadsDir);

app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.use('/gist', express.static(path.join(__dirname, 'public')));

app.get('/gist', function (req, res) {
  res.render('home', {languages:languages});
});

app.get('/gist/:id', function (req, res, next) {
  console.log('/gist/:id');
  fs.readFile(path.join(uploadsDir, req.params.id), function (err, data) {
    if (err) 
      return next();

    var gist = JSON.parse(data);
    gist.id = req.params.id;
    res.render('gist', {gist:gist, languages:languages});
  });
});

app.get('/gist/:id/raw', function (req, res, next) {
  console.log('/gist/:id/raw');
  fs.readFile(path.join(uploadsDir, req.params.id), function (err, data) {
    if (err) 
      return next();
    
    var gist = JSON.parse(data);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(gist.contents);
  });
});

app.post('/gist/create', function (req, res) {
  var name = randomName(9);
  req.pipe(fs.createWriteStream(path.join(uploadsDir, name)));
  req.on('end', function () {
    res.send(name);
  });
});

var port = process.env.PORT || 3000;
app.listen(port);