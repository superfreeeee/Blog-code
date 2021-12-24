/**
 * jQuery.noConflict 避免命名冲突
 */
// ? Read
define( [
	"../core"
], function( jQuery ) {

"use strict";

// 原本的全局 jQuery, $ 对象
var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

/**
 * 调用 noConflict 接口复原原始 $, jQuery 全局变量
 *   返回 jQuery 对象
 * @param {*} deep 
 * @returns 
 */
jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}

} );
