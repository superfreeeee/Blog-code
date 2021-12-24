/**
 * 创建 jQuery 实例方法
 */
// ? Read
// Initialize a jQuery object
define( [
	"../core",
	"../var/document",
	"../var/isFunction",
	"./var/rsingleTag",

	"../traversing/findFilter"
], function( jQuery, document, isFunction, rsingleTag ) {

"use strict";

// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	/**
	 * init 方法
	 *   jQuery 内部主类
	 */
	// ? Read
	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			// 空选择器直接返回当前对象
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// 1. selector 为字符串形式的 css 选择器

			// selector 匹配
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				// selector = <tag>
				match = [ null, selector, null ];

			} else {
				// selector = #\w+
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {
				// 1.1 string 类型 or html 标签类型

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					// 1.1.1 字符串表示某 html 标签

					// 选择 selector
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					// 返回带 html 元素的 jQuery 实例
					return this;

				// HANDLE: $(#id)
				} else {
					// 1.1.2 #\w+ := id 选择器
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						// 直接返回 jQuery.fn.init { 0: elem }
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				// 1.2 非 id 字符串  => 其他 css 选择器
				//   无 context、无 context.jquery（应该只有 rootJQuery 没有）
				//   直接返回 jQueryInstance.find(selector)
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				// 1.3 带上下文选择器 $(selector, context)  => $(context).find(expr)
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			// 2. selector 为 HTMLElement 元素
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			// 3. selector 为函数  => document.ready(cb=selector)
			// 调用 root.ready（除了 rootJQuery 实例都有 ready 方法） or 立即执行
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		// 返回当前实例并 push(selector)
		return jQuery.makeArray( selector, this );
	};

// init 继承 jQuery.fn 原型
// 即 jQuery() === new jQuery.fn.init() 实例.__proto === jQuery.fn
// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// 初始化根实例
// Initialize central reference
rootjQuery = jQuery( document );

return init;

} );
