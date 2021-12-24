/**
 * 返回目标参数类型
 *   对象 or 函数：根据 class2type 查找对应类型
 *   其他类型：返回 typeof 返回的类型
 */
// ? Read
define( [
	"../var/class2type",
	"../var/toString"
], function( class2type, toString ) {

"use strict";

function toType( obj ) {
	if ( obj == null ) {
		// 返回 'null' 或是 'undefined'
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	// object / function 类型从 class2type 查找（key 为 toString(obj)）
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}

return toType;
} );
