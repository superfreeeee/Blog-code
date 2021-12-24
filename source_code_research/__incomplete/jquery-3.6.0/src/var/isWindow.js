/**
 * 判断是否为 window 对象
 */
// ? Read
define( function() {
	"use strict";

	return function isWindow( obj ) {
		// 不为空，且存在 window.window === window 自环
		return obj != null && obj === obj.window;
	};

} );
