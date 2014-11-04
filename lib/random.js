var fs = require('fs'),
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

function randomFileName(dir, cb) {
  var attempts = 0;
  
  function tryCreate() {
    var name = randomName(9);

    attempts++;

    fs.open(path.join(dir, name), 'wx', function(err, fd) {
      if (err) {
        if (attempts < 5) {
          return tryCreate();
        }

        return cb(err);
      }

      fs.close(fd, function() {
        cb(null, name);
      });
    });
  }

  tryCreate();
}

module.exports = randomFileName;
