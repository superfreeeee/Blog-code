/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module

/**
 * jQuery 核心模块
 *   core.js：
 *     > 原型方法
 *     jQuery.fn === jQuery.prototype
 *   ? jQuery.fn.jquery        jQuery 版本号
 *   ? jQuery.fn.constructor   jQuery 基类
 *   ? jQuery.fn.length        数组长度
 *   ? jQuery.fn.toArray
 *     jQuery.fn.get
 *     jQuery.fn.pushStack
 *     jQuery.fn.each
 *     jQuery.fn.map
 *     jQuery.fn.slice
 *     jQuery.fn.first
 *     jQuery.fn.last
 *     jQuery.fn.even
 *     jQuery.fn.odd
 *     jQuery.fn.eq
 *     jQuery.fn.end
 *     jQuery.fn.push
 *     jQuery.fn.sort
 *     jQuery.fn.splice
 * 
 *     jQuery.extend = jQuery.fn.extend
 * 
 *     > 静态方法
 *   ? jQuery.expando = randomid  同页面不同副本的唯一标识
 *   ? jQuery.isReady = true      ready 模块之外准备完成
 *     jQuery.error
 *   ? jQuery.noop
 *   ? jQuery.isPlainObject
 *   ? jQuery.isEmptyObject
 *     jQuery.globalEval
 *   ? jQuery.each
 *   ? jQuery.makeArray
 *   ? jQuery.inArray
 *   ? jQuery.merge
 *     jQuery.grep
 *   ? jQuery.map
 *   ? jQuery.guid       global uid 全局唯一标识
 *     jQuery.support
 * 
 *   ? jQuery.fn[Symbol.iterator]
 * 
 *   selector-sizzle.js
 *     > 静态方法
 *     jQuery.find
 *     jQuery.expr
 *     jQuery.expr[':'] = jQuery.expr.pseudos
 *     jQuery.uniqueSort = jQuery.unique
 *     jQuery.text
 *     jQuery.isXMLDoc
 *     jQuery.contains
 *     jQuery.escapeSelector
 * 
 *   traversing.js
 *     > 原型方法
 *     jQuery.fn.has
 *     jQuery.fn.closest
 *     jQuery.fn.index
 *     jQuery.fn.add
 *     jQuery.fn.addBack
 * 
 *   ? jQuery.fn.parent
 *   ? jQuery.fn.parents
 *   ? jQuery.fn.parentsUntil
 *   ? jQuery.fn.next
 *   ? jQuery.fn.prev
 *   ? jQuery.fn.nextAll
 *   ? jQuery.fn.prevAll
 *   ? jQuery.fn.nextUntil
 *   ? jQuery.fn.prevUntil
 *   ? jQuery.fn.siblings
 *   ? jQuery.fn.children
 *     jQuery.fn.contents
 */
// ? Read
define( [
	"./var/arr",
	"./var/getProto",
	"./var/slice",
	"./var/flat",
	"./var/push",
	"./var/indexOf",
	"./var/class2type",
	"./var/toString",
	"./var/hasOwn",
	"./var/fnToString",
	"./var/ObjectFunctionString",
	"./var/support",
	"./var/isFunction",
	"./var/isWindow",
	"./core/DOMEval",
	"./core/toType"
], function( arr, getProto, slice, flat, push, indexOf,
	class2type, toString, hasOwn, fnToString, ObjectFunctionString,
	support, isFunction, isWindow, DOMEval, toType ) {

"use strict";

var
	version = "3.6.0",

	/**
	 * 类型核心
	 */
	// ? Read
	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// 包装 fn.init 类型
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	/**
	 * this.slice 返回新数组
	 * @returns 
	 */
	// ? Read
	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

/**
 * extend 扩展方法
 *   deep?: boolean, ...options
 * 
 * 	 deep    表示是否使用深拷贝
 * 
 *   options 传入一个对象则是扩展 jQuery 对象（this 对象）
 *           传入多个对象则将后面对象的属性复制到第一个对象
 */
// ? Read
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {}, // 扩展目标对象
		i = 1,
		length = arguments.length, // 参数个数
		deep = false;

	// (deep: boolean, target: object)
	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		// 扩展目标幂等为 {}
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	// i 越界，只有一个参数对象，相当于扩展当前实例 target = this
	// 即多个对象以第一个为目标，i 之后为扩展对象
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {
			// 扩展非空对象

			// Extend the base object
			for ( name in options ) {
				// 枚举目标对象的每一个属性
				copy = options[ name ];

				// 忽略 __proto__ 属性 or 自环对象
				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				// 第一次扩展非 deep，不会使用到 isPlainObject
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					// 1. 深拷贝（简单对象 || 数组对象）
					src = target[ name ]; // target 上的原来对象

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						// copy 为数组，src 上不是
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						// copy 是对象，src 不是
						clone = {};
					} else {
						// copy 与 src 类型符合
						clone = src;
					}
					copyIsArray = false;

					// clone 为新目标
					// 将 copy 对象克隆到 clone 对象，然后重新赋值回 target
					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					// 2. 非深拷贝时只复制非 undefined 对象
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	// ? 空函数
	noop: function() {},

	/**
	 * 检查是否为简单 Object 对象
	 *   1. Object.create(null)
	 *   2. new Object()
	 * @param {*} obj 
	 * @returns 
	 */
	// ? Read
	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		// 不是 [object Object] 的直接 false
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		// Object.prototpye.getPrototypeOf(obj)
		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		// 没有 proto 的是简单对象（Object.create(null)）
		if ( !proto ) {
			return true;
		}

		// 使用 fnToString 确保 obj.constructor === Object
		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	/**
	 * 检查是否为空对象
	 *   使用 for..in 遍历属性
	 * @param {*} obj 
	 * @returns 
	 */
	// ? Read
	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	/**
	 * 遍历目标对象
	 * @param {Object|Array} obj 
	 * @param {(index, value) => boolean} callback 
	 * @returns 
	 */
	// ? Read
	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			// 1. 遍历数组
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					// obj[i].callback(index, value)  => false 时提前结束
					break;
				}
			}
		} else {
			// 2. 遍历对象
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					// obj[i].callback(index, value)  => false 时提前结束
					break;
				}
			}
		}

		return obj;
	},

	/**
	 * 创建数组（jQuery 实例数组）
	 * @param {*} arr 
	 * @param {Array|jQuery.fn.init} results 
	 * @returns 
	 */
	// ? Read
	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				// 1. 将参数数组合并到 ret 中
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				// 2. ret.push(arr)
				push.call( ret, arr );
			}
		}

		return ret;
	},

	/**
	 * 检查 elem 是否在 arr 的 i 下标之后
	 * @param {*} elem 
	 * @param {*} arr 
	 * @param {*} i 
	 * @returns 
	 */
	// ? Read
	inArray: function( elem, arr, i ) {
		// 相当于 indexOf 的包装
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	/**
	 * 将 second 的元素合并到 first 当中
	 *   同步类数组对象 length 属性
	 * @param {*} first 
	 * @param {*} second 
	 * @returns 
	 */
	// ? Read
	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	/**
	 * 遍历并返回新数组/对象
	 * @param {*} elems 
	 * @param {(value, index, arg=context) => newValue} callback 
	 * @param {*} arg 类似 context 作用
	 * @returns 
	 */
	// ? Read
	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			// 1. 遍历数组
			length = elems.length;
			for ( ; i < length; i++ ) {
				// callback: (value, index, arg=context) => newValue
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					// 只保留非空对象
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			// 2. 遍历对象
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					// 只保留非空对象
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		// 返回摊平数组
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// 继承 Array.prototype[Symbol.iterator] 迭代器
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		// 记录 class2type 类型对
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

/**
 * 判断当前对象是否为数组
 * @param {*} obj 
 * @returns 
 */
// ? Read
function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length, // obj.length
		type = toType( obj ); // obj 类型

	// Function | window 对象不是数组
	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	// array 类型、lenght 为非负整数（至少 length - 1 in obj）
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

return jQuery;
} );
