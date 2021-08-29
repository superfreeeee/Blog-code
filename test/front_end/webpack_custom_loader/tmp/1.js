import api from "!../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js";
            import content from "!!../libs/loaders/log-loader.js!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[3]!../libs/loaders/log-loader.js!../node_modules/sass-loader/dist/cjs.js!./index.module.scss";

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



export default content.locals || {};