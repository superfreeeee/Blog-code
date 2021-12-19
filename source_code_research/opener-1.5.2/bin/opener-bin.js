#!/usr/bin/env node
"use strict";

var opener = require("..");

// 忽略前两个 node、opener 参数
opener(process.argv.slice(2), function (error) {
    if (error) {
        throw error;
    }
});
