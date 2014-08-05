var express = require('express'),
  exphbs = require('express3-handlebars'),
  fs = require('fs'),
  highlight = require('./lib/highlight'),
  languages = require('./lib/languages'),
  marked = require('marked'),
  path = require('path');

function randomName(length) {
  var i,
    name = '',
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (i = 0; i < length; i++) {
    name += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return name;
}

var uploadsDir = path.join(__dirname, 'uploads'),
  app = express(),
  port = process.env.PORT || 3000;

if (!fs.existsSync(uploadsDir))
  fs.mkdirSync(uploadsDir);

app.disable('x-powered-by');

app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('home', {
    title: 'PlatDev Gist',
    languages: languages
  });
});

app.get('/:id.txt', function(req, res, next) {
  fs.readFile(path.join(uploadsDir, req.params.id), function(err, data) {
    if (err) 
      return next();

    var gist = JSON.parse(data);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(gist.contents);
  });
});

app.get('/:id', function(req, res, next) {
  fs.readFile(path.join(uploadsDir, req.params.id), function(err, data) {
    if (err) {
      return next();
    }

    var highlighted,
      gist = JSON.parse(data),
      params = {
        title: 'gist:' + req.params.id,
        language: gist.language,
        id: req.params.id
      };

    if (gist.language === 'Markdown') {
      params.html = marked(gist.contents);
      res.render('document', params);
    } else {
      highlighted = highlight(gist.contents, gist.language);
      params.css = highlighted.css;
      params.html = highlighted.html;
      res.render('code', params);
    }
  });
});

app.post('/create', function(req, res) {
  var name = randomName(9);
  req.pipe(fs.createWriteStream(path.join(uploadsDir, name)));
  req.on('end', function() {
    res.send(name);
  });
});

app.use(function(req, res, next) {
  res.status(404).render('404');
});

app.listen(port);
console.log('Listening on port %d', port);
