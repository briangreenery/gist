ace.define('ace/theme/gist', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-gist";
exports.cssText = "\
.ace-gist .ace_gutter {\
border-right: 1px solid #eee;\
color: #333\
}\
.ace-gist .ace_print-margin {\
width: 1px;\
background: #e8e8e8\
}\
.ace-gist {\
background-color: #FFFFFF;\
color: #000000\
}\
.ace-gist .ace_cursor {\
color: #000000\
}\
.ace-gist .ace_marker-layer .ace_selection {\
background: #B5D5FF\
}\
.ace-gist.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #FFFFFF;\
border-radius: 2px\
}\
.ace-gist .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174)\
}\
.ace-gist .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
}\
.ace-gist .ace_marker-layer .ace_active-line {\
background: #f8f8f8\
}\
.ace-gist .ace_gutter-active-line {\
background-color: #f8f8f8\
}\
.ace-gist .ace_marker-layer .ace_selected-word {\
border: 1px solid #B5D5FF\
}\
.ace-gist .ace_constant.ace_language,\
.ace-gist .ace_keyword,\
.ace-gist .ace_meta,\
.ace-gist .ace_variable.ace_language {\
color: #C800A4\
}\
.ace-gist .ace_invisible {\
color: #BFBFBF\
}\
.ace-gist .ace_constant.ace_character,\
.ace-gist .ace_constant.ace_other {\
color: #275A5E\
}\
.ace-gist .ace_constant.ace_numeric {\
color: #3A00DC\
}\
.ace-gist .ace_entity.ace_other.ace_attribute-name,\
.ace-gist .ace_support.ace_constant,\
.ace-gist .ace_support.ace_function {\
color: #450084\
}\
.ace-gist .ace_fold {\
background-color: #C800A4;\
border-color: #000000\
}\
.ace-gist .ace_entity.ace_name.ace_tag,\
.ace-gist .ace_support.ace_class,\
.ace-gist .ace_support.ace_type {\
color: #790EAD\
}\
.ace-gist .ace_storage {\
color: #C900A4\
}\
.ace-gist .ace_string {\
color: #DF0002\
}\
.ace-gist .ace_comment {\
color: #008E00\
}\
.ace-gist .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==) right repeat-y\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
