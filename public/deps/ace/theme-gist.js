ace.define('ace/theme/gist', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-gist";
exports.cssText = "/* CSS style content from gist's default pygments highlighter template.\
Cursor and selection styles from textmate.css. */\
.ace-gist .ace_gutter {\
border-right: 1px solid #eee;\
margin-right: 9px;\
color: #bbb\
}\
.ace-gist  {\
background: #fff;\
color: #000;\
}\
.ace-gist .ace_storage,\
.ace-gist .ace_variable.ace_language,\
.ace-gist .ace_support.ace_function,\
.ace-gist .ace_string.ace_regexp,\
.ace-gist .ace_variable.ace_instance,\
.ace-gist .ace_keyword {\
color: #008ABF;\
}\
.ace-gist .ace_operator {\
color: inherit;\
}\
.ace-gist .ace_string {\
color: #D9182D;\
}\
.ace-gist .ace_boolean,\
.ace-gist .ace_variable.ace_class,\
.ace-gist .ace_constant.ace_buildin,\
.ace-gist .ace_constant.ace_numeric {\
color: #D9182D;\
}\
.ace-gist .ace_comment {\
color: #998;\
font-style: italic;\
}\
.ace-gist .ace_cursor {\
color: black;\
}\
.ace-gist .ace_marker-layer .ace_active-line {\
background: rgb(255, 255, 204);\
}\
.ace-gist .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-gist.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px white;\
border-radius: 2px;\
}\
.ace-gist .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
.ace-gist .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
.ace-gist .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-gist .ace_gutter-active-line {\
background-color : rgba(0, 0, 0, 0.07);\
}\
.ace-gist .ace_marker-layer .ace_selected-word {\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
}\
.ace-gist .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-gist .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}";

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});
