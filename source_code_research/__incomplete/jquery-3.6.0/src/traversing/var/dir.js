/**
 * 导出遍历元素方法
 */
// ? Read
define( [
	"../../core"
], function( jQuery ) {

"use strict";

/**
 * dir(elem, dir, until) 返回当前元素所有子元素列表
 *   elem  目标元素
 *   dir   迭代属性（paraentNode, nextSibiling 等）
 *   until 终止目标
 * 
 * 从起始元素 elem 开始，每次前进 elem[dir]，知道 util（不包括 until）
 * 即包含从 elem 到 until/document 之前，所有 dir 属性的元素节点（ELEMENT_NODE）
 */
// ? Read
return function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	// elem 存在且非 document 节点
	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			// 针对 element 节点
			if ( truncate && jQuery( elem ).is( until ) ) {
				// 遇到 until 则结束
				break;
			}
			// 加入当前元素
			matched.push( elem );
		}
	}
	return matched;
};

} );
