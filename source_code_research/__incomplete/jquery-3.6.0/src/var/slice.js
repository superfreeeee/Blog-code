/**
 * 导出 [].slice 方法
 *   应该是 Array.prototype.slice 的原方法
 */
// ? Read
define( [
	"./arr"
], function( arr ) {
	"use strict";

	return arr.slice;
} );
