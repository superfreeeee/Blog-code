module.exports = minimatch;
minimatch.Minimatch = Minimatch;

var path = { sep: '/' };
try {
  path = require('path');
} catch (er) {}

var GLOBSTAR = (minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {});
var expand = require('brace-expansion');

/* 2_4_parse */
function charSet(s) {}

/* 1_1_filter */
minimatch.filter = filter;
function filter(pattern, options) {}

/* 3_3_ext */
function ext(a, b) {}

/* 1_0_defaults */
minimatch.defaults = function (def) {};

/* 2_0_defaults */
Minimatch.defaults = function (def) {};

/* 1_minimatch */
function minimatch(p, pattern, options) {}

/* 2_Minimatch */
function Minimatch(pattern, options) {}

/* 2_1_make */
Minimatch.prototype.debug = function () {};

/* 2_1_make */
Minimatch.prototype.make = make;
function make() {}

/* 2_2_parseNegate */
Minimatch.prototype.parseNegate = parseNegate;
function parseNegate() {}

/* 1_2_braceExpand */
minimatch.braceExpand = function (pattern, options) {};

/* 2_3_braceExpand */
Minimatch.prototype.braceExpand = braceExpand;
function braceExpand(pattern, options) {}

/* 2_4_parse */
Minimatch.prototype.parse = parse;
function parse(pattern, isSub) {}

/* 1_3_makeRe */
minimatch.makeRe = function (pattern, options) {};

/* 2_5_makeRe */
Minimatch.prototype.makeRe = makeRe;
function makeRe() {}

/* 1_4_match */
minimatch.match = function (list, pattern, options) {};

/* 2_6_match */
Minimatch.prototype.match = match;
function match(f, partial) {}

/* 2_7_matchOne */
Minimatch.prototype.matchOne = function (file, pattern, partial) {};

/* 3_1_globUnescape */
function globUnescape(s) {}

/* 3_2_regExpEscape */
function regExpEscape(s) {}
