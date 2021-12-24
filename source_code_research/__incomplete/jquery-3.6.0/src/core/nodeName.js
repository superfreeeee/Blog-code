/**
 * 导出 nodeName 函数
 */
// ? Read
define( function() {

"use strict";

/**
 * 检查目标元素名称
 * @param {*} elem 
 * @param {*} name 
 * @returns 
 */
// ? Read
function nodeName( elem, name ) {

	// 比较 elem 与 name 字符串
	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}

return nodeName;

} );
