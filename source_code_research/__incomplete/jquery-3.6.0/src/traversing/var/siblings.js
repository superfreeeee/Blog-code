/**
 * 导出 siblings 函数
 */
// ? Read
define( function() {

"use strict";

/**
 * siblings 函数
 *   获取目标节点所有兄弟节点
 */
// ? Read
return function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			// 只保存 ELEMENT_NODE 元素节点
			matched.push( n );
		}
	}

	return matched;
};

} );
