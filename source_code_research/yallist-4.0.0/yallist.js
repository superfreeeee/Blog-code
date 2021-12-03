'use strict'
module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

/**
 * 双向链表类型构造函数
 * @param {*} list 
 * @returns 
 */
// ? Read
function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  // 利用参数初始化 Yallist 对象
  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

/**
 * 移除指定节点
 * @param {*} node 
 * @returns 
 */
// ? Read
Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  // prev - cur - next
  // 更新 prev、next
  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  // 更新 head、tail
  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  // 更新 node
  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

/**
 * 从头部压入一个节点
 * @param {*} node 
 * @returns 
 */
// ? Read
Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  // 从原列表移除
  if (node.list) {
    node.list.removeNode(node)
  }

  // 更新 node
  var head = this.head
  node.list = this
  node.next = head
  // 更新 head
  if (head) {
    head.prev = node
  }

  this.head = node
  // 更新 tail
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

/**
 * 从尾部压入一个节点
 * @param {*} node 
 * @returns 
 */
// ? Read
Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    // 从旧列表删除
    node.list.removeNode(node)
  }

  // 更新 node
  var tail = this.tail
  node.list = this
  node.prev = tail

  // 更新 tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  // 更新 head
  if (!this.head) {
    this.head = node
  }
  this.length++
}

/**
 * 从尾部压入多个数据
 * @returns 
 */
// ? Read
Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

/**
 * 从头部压入多个数据
 * @returns 
 */
// ? Read
Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

/**
 * 从尾部移除一个数据
 * @returns 
 */
// ? Read
Yallist.prototype.pop = function () {
  // 长度为 0
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  // 更新 tail
  this.tail = this.tail.prev
  if (this.tail) {
    // 还有剩余节点
    this.tail.next = null
  } else {
    // 没有剩余节点了
    this.head = null
  }
  this.length--
  return res
}

/**
 * 从头部移除一个数据
 * @returns 
 */
// ? Read
Yallist.prototype.shift = function () {
  // 没有节点
  if (!this.head) {
    return undefined
  }

  // 更新 head
  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    // 还有剩余节点
    this.head.prev = null
  } else {
    // 没有剩余节点
    this.tail = null
  }
  this.length--
  return res
}

/**
 * 遍历链表
 * @param {*} fn 
 * @param {*} thisp 
 */
// ? Read
Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    // Array.prototype.forEach((value, index, arr) => void)
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

/**
 * 反向遍历链表
 * @param {*} fn 
 * @param {*} thisp 
 */
// ? Read
Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

/**
 * 获取第 n 个节点的数据 | undefined
 * @param {*} n 
 * @returns 
 */
// ? Read
Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

/**
 * 获取倒数第 n 个节点的数据 | undefined
 * @param {*} n 
 * @returns 
 */
// ? Read
Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

/**
 * 按序遍历，并返回新的链表
 * @param {*} fn 
 * @param {*} thisp 
 * @returns 
 */
// ? Read
Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

/**
 * 倒序遍历，并返回新的链表
 * @param {*} fn 
 * @param {*} thisp 
 * @returns 
 */
// ? Read
Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

/**
 * 聚合链表
 * @param {*} fn 
 * @param {*} initial 
 * @returns 
 */
// ? Read
Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    // 有初始值
    acc = initial
  } else if (this.head) {
    // 没有初始值，至少有一个数据
    walker = this.head.next
    acc = this.head.value
  } else {
    // 一个数据都没有时至少需要提供一个初始值
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    // reduceFn(prev, next, index)
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

/**
 * 反向聚合链表
 * @param {*} fn 
 * @param {*} initial 
 * @returns 
 */
// ? Read
Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  // ===== 参数校验 & 初始值
  // tail -> head
  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

/**
 * 转换为一般数组
 * @returns 
 */
// ? Read
Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

/**
 * 转换成倒序数组
 * @returns 
 */
// ? Read
Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

/**
 * 切片 & 返回新的链表
 * @param {*} from 
 * @param {*} to 
 * @returns 
 */
// ? Read
Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }

  // ========== 参数校验（允许负数索引） ==========
  var ret = new Yallist()

  // from、to 范围对齐
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }

  // 将 from ~ to 的节点数据放入新的链表并返回
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

/**
 * 倒序切片 & 返回新的链表（slice 后 reverse）
 * @param {*} from 
 * @param {*} to 
 * @returns 
 */
// ? Read
Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

/**
 * 裁剪原始链表
 * @param {*} start 
 * @param {*} deleteCount 
 * @param  {...any} nodes 
 * @returns 
 */
// ? Read
Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  // 每次提出一个数据并删除节点
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  // 删除节点数量超过链表长度
  if (walker === null) {
    walker = this.tail
  }

  // 删除节点数量小于链表长度
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  // 替入新节点
  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

/**
 * 反转链表
 * @returns 
 */
// ? Read
Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

/**
 * 插入节点到目标节点之后并返回当前接节点
 * @param {*} self 
 * @param {*} node 
 * @param {*} value 
 * @returns 
 */
// ? Read
function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  // 更新 head、tail
  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

/**
 * 从尾部推入一个数据
 * @param {*} self 
 * @param {*} item 
 */
// ? Read
function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

/**
 * 从头部推入一个数据
 * @param {*} self 
 * @param {*} item 
 */
// ? Read
function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

/**
 * 节点类型
  Node {
    list  Yallist 实例
    value 当前节点数据
    prev  前一个节点
    next  下一个节点
  }
 * @param {*} value 
 * @param {*} prev 
 * @param {*} next 
 * @param {*} list 
 * @returns 
 */
// ? Read
function Node (value, prev, next, list) {
  // 直接调用 Node 方法
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  // prev <-> cur
  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  // cur <-> next
  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

// 注入 Yallist.prototype[Symbol.iterator] 迭代器
// ? Read
try {
  // add if support for Symbol.iterator is present
  require('./iterator.js')(Yallist)
} catch (er) {}
