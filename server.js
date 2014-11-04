var express = require('express'),
  exphbs = require('express-handlebars'),
  fs = require('fs'),
  highlight = require('./lib/highlight'),
  languages = require('./lib/languages'),
  marked = require('marked'),
  path = require('path'),
  randomFileName = require('./lib/random');

var uploadsDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads'),
  app = express(),
  port = process.env.PORT || 3000;

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.disable('x-powered-by');

app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.locals.brand = process.env.BRAND || 'Code';

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('home', {
    title: app.locals.brand + ' Gist',
    languages: languages
  });
});

app.get('/:id.txt', function(req, res, next) {
  fs.readFile(path.join(uploadsDir, req.params.id), function(err, data) {
    if (err) {
      return next();
    }

    var gist = JSON.parse(data);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(gist.contents);
  });
});

app.get('/:id', function(req, res, next) {
  fs.readFile(path.join(uploadsDir, req.params.id), function(err, data) {
    var highlighted, gist, params;

    if (err) {
      return next();
    }

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

app.post('/create', function(req, res, next) {
  randomFileName(uploadsDir, function(err, name) {
    var writeStream;

    if (err) {
      return next(err);
    }

    writeStream = fs.createWriteStream(path.join(uploadsDir, name));

    writeStream.on('error', function() {
      res.status(500).send('Internal server error');
    });

    req.on('error', function() {
      writeStream.destroy();
    });

    writeStream.on('finish', function() {
      res.send(name);
    });

    req.pipe(writeStream);
  });
});

app.use(function(req, res, next) {
  res.status(404).render('404');
});

app.listen(port);
console.log('Listening on port %d', port);
