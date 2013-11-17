var languages = require('./languages');

require('amd-loader');

var dom     = require('jsdom/lib/jsdom/level2/html').dom.level2.html;
var browser = require('jsdom/lib/jsdom/browser/index').windowAugmentation(dom);

global.document  = browser.document;
global.window    = browser.window;
global.self      = browser.self;
global.navigator = browser.navigator;
global.location  = browser.location;

require('./public/deps/ace/ace.js');
require('./public/deps/ace/ext-static_highlight.js');
require('./public/deps/ace/theme-gist.js');

var modes = [];
for (var i = 0; i < languages.length; ++i) {
  require('./public/deps/ace/mode-' + languages[i].mode);
  modes[languages[i].name] = 'ace/mode/' + languages[i].mode;
}

var highlighter = ace.require('ace/ext/static_highlight');
var theme = ace.require('ace/theme/gist');

module.exports = function (data, language) {
  return highlighter.renderSync(data, modes[language], theme, 1, false);
};
