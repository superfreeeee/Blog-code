/**
 * 本质上是 Object.prototype.toString 方法
 */
// ? Read
define( [
	"./class2type"
], function( class2type ) {
	"use strict";

	return class2type.toString;
} );
