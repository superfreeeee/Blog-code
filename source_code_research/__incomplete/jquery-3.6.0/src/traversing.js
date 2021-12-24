define( [
	"./core",
	"./var/getProto",
	"./var/indexOf",
	"./traversing/var/dir",
	"./traversing/var/siblings",
	"./traversing/var/rneedsContext",
	"./core/nodeName",

	"./core/init",
	"./traversing/findFilter",
	"./selector"
], function( jQuery, getProto, indexOf, dir, siblings, rneedsContext, nodeName ) {

"use strict";

// 降序方法正则
var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

/**
 * 返回兄弟节点
 *   nextSibling 或 previousSibling
 * @param {*} cur 
 * @param {*} dir 
 * @returns 
 */
// ? Read
function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

// 参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Node
// Node 类型定义与相关接口
jQuery.each( {
	parent: function( elem ) {
		// 返回父节点（遇到 DocumentFragment 则返回 null）
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		// 返回从 elem 到 document 为止路径上所有父节点
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		// 返回从 elem 到 document 为止路径上所有父节点 + until 条件
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		// 返回下一个节点
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		// 返回上一个节点
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		// 返回之后的所有节点
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		// 返回之前的所有节点
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		// nextAll + until
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		// prevAll + until
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		// 返回所有兄弟节点
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		// 返回所有子节点
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		// 符合条件的元素列表
		var matched = jQuery.map( this, fn, until );

		// Until 后缀
		if ( name.slice( -5 ) !== "Until" ) {
			// 非后缀方法 => 参数为 (selector)
			selector = until;
		}

		// 存在过滤条件
		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		// 长度超过 1 元素列表
		if ( this.length > 1 ) {

			// 排序 & 去重
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// 降序需要再进行一次反转
			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );

return jQuery;
} );
