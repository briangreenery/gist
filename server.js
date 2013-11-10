var express = require('express');
var exphbs = require('express3-handlebars');
var path = require('path');

var app = express();

app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('home');
});

app.listen(3000);
