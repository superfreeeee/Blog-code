/**
 * 导出 flat 方法
 *   用于摊平多维数组（摊平一层）
 */
// ? Read
define( [
	"./arr"
], function( arr ) {

"use strict";

// Support: IE 9 - 11+, Edge 18+, Android Browser 4.0 - 4.3 only, iOS 7 - 11 only, Safari 11 only,
// Firefox <= 61 only
// Provide fallback for browsers without Array#flat.
return arr.flat ? function( array ) {
	// 1. 环境自带 flat 函数
	return arr.flat.call( array );
} : function( array ) {
	// 2. 使用 concat 模拟实现（使用 apply 实现 ES6 的 ...展开效果）
	return arr.concat.apply( [], array );
};

} );
