'use strict';

// A linked list to keep track of recently-used-ness
const Yallist = require('yallist');

const MAX = Symbol('max'); //                             Cache 最大容量
const LENGTH = Symbol('length'); //                       Cache 当前容量
const LENGTH_CALCULATOR = Symbol('lengthCalculator'); //  Cache 数据长度计算函数
const ALLOW_STALE = Symbol('allowStale'); //              标志：允许 stale 缓存返回
const MAX_AGE = Symbol('maxAge'); //                      默认过期时间
const DISPOSE = Symbol('dispose'); //                     卸载函数回调
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet'); //    标识：重复 set 时是否调用 dispose
const LRU_LIST = Symbol('lruList'); //                    Cache 数据链表
const CACHE = Symbol('cache'); //                         Cache 缓存 Map
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet'); //    标志：get 时是否更新 now

const naiveLength = () => 1;

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  /**
   * 构造函数：初始化各项属性 & 标志
   * 调用 reset 重置 Cache
   * @param {*} options
   */
  // ? Read
  constructor(options) {
    if (typeof options === 'number') options = { max: options };

    if (!options) options = {};

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number');
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = (this[MAX] = options.max || Infinity);

    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number');
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }

  // ? Read
  // resize the cache when the max changes.
  set max(mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number');

    // 更新最大容量 & 裁剪过量空间
    this[MAX] = mL || Infinity;
    trim(this);
  }
  // ? getter
  get max() {
    return this[MAX];
  }

  // ? 更新 ALLOW_STALE 标志
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  // ? getter
  get allowStale() {
    return this[ALLOW_STALE];
  }

  /**
   * 重置默认 maxAge & 裁剪过量空间
   * (理论上修改 maxAge 应该是不影响 LENGTH，trim 也无效)
   */
  // ? Read
  set maxAge(mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number');

    this[MAX_AGE] = mA;
    trim(this);
  }
  // ? getter
  get maxAge() {
    return this[MAX_AGE];
  }

  // ? Read
  // resize the cache when the lengthCalculator changes.
  set lengthCalculator(lC) {
    if (typeof lC !== 'function') lC = naiveLength;

    if (lC !== this[LENGTH_CALCULATOR]) {
      // 更新 lC 后重新计算 length
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    // 裁剪超量空间
    trim(this);
  }
  // ? getter
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }

  // ? getter
  get length() {
    return this[LENGTH];
  }
  // ? getter
  get itemCount() {
    return this[LRU_LIST].length;
  }

  /**
   * 反向遍历列表
   * @param {*} fn
   * @param {*} thisp
   */
  // ? Read
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null; ) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }

  /**
   * 遍历链表
   * @param {*} fn
   * @param {*} thisp
   */
  // ? Read
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null; ) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }

  /**
   * 缓存 key 列表
   * @returns
   */
  // ? Read
  keys() {
    return this[LRU_LIST].toArray().map((k) => k.key);
  }

  /**
   * 缓存 value 列表
   * @returns
   */
  // ? Read
  values() {
    return this[LRU_LIST].toArray().map((k) => k.value);
  }

  /**
   * 初始化 Cache
   */
  // ? Read
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
    }

    this[CACHE] = new Map(); // hash of items by key
    this[LRU_LIST] = new Yallist(); // list of items in order of use recency
    this[LENGTH] = 0; // length of items in the list
  }

  /**
   * 序列化
   * @returns
   */
  // ? Read
  dump() {
    return this[LRU_LIST].map((hit) =>
      isStale(this, hit)
        ? false
        : {
            // k = key, v = value, e = expire
            k: hit.key,
            v: hit.value,
            e: hit.now + (hit.maxAge || 0),
          }
    )
      .toArray()
      .filter((h) => h);
  }

  // ? 返回链表
  dumpLru() {
    return this[LRU_LIST];
  }

  /**
   * 缓存数据
   * @param {*} key
   * @param {*} value
   * @param {*} maxAge
   * @returns
   */
  // ? Read
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]; // 使用默认 maxAge

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number');

    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);

    // 1. 数据 key 已存在
    if (this[CACHE].has(key)) {
      // 数据项超过总体积
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }

      const node = this[CACHE].get(key);
      const item = node.value;

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      // 重复 set 时调用 dispose
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
      }

      // 更新 item
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;

      // 访问节点 & 裁剪过量数据
      this.get(key);
      trim(this);
      return true;
    }

    // 2. 新数据
    const hit = new Entry(key, value, len, now, maxAge);

    // oversized objects fall out of cache automatically.
    // 超过限制大小 => 直接调用 dispose 并返回
    if (hit.length > this[MAX]) {
      if (this[DISPOSE]) this[DISPOSE](key, value);

      return false;
    }

    // 推入数据
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }

  /**
   * 检查是否包含指定缓存 key
   * @param {*} key
   * @returns
   */
  // ? Read
  has(key) {
    if (!this[CACHE].has(key)) return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }

  /**
   * get 时更新 now
   * @param {*} key
   * @returns
   */
  // ? Read
  get(key) {
    return get(this, key, true);
  }

  /**
   * peek 与 get 相同，但不更新 now
   * @param {*} key
   * @returns
   */
  // ? Read
  peek(key) {
    return get(this, key, false);
  }

  /**
   * 弹出最旧的数据
   * @returns
   */
  // ? Read
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node) return null;

    // 删除最后一个节点并返回
    del(this, node);
    return node.value;
  }

  /**
   * 删除指定 key 数据
   * @param {*} key
   */
  // ? Read
  del(key) {
    del(this, this[CACHE].get(key));
  }

  /**
   * 反序列化
   * @param {*} arr
   */
  // ? Read
  load(arr) {
    // reset the cache
    this.reset();

    const now = Date.now();
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        // 1. 无 maxAge
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v);
      else {
        // 2. 有 maxAge
        const maxAge = expiresAt - now;
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }

  /**
   * 清理过期数据
   */
  // ? Read
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}

/**
 * 访问缓存节点
 * @param {*} self
 * @param {*} key
 * @param {*} doUse
 * @returns
 */
// ? Read
const get = (self, key, doUse) => {
  // 缓存节点
  const node = self[CACHE].get(key);
  if (node) {
    // entry
    const hit = node.value;
    if (isStale(self, hit)) {
      // 节点过期则删除
      del(self, node);
      if (!self[ALLOW_STALE]) return undefined;
    } else {
      // 更新节点
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};

/**
 * 检查缓存数据是否过期
 * @param {*} self
 * @param {*} hit
 * @returns
 */
// ? Read
const isStale = (self, hit) => {
  // 未命中 or 未设置过期时间 => 不过期
  if (!hit || (!hit.maxAge && !self[MAX_AGE])) return false;

  const diff = Date.now() - hit.now;
  // 有 maxAge => 检查是否过期
  // 没有 maxAge => 使用默认 maxAge
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};

/**
 * 超过缓存容量时进行裁剪
 * @param {*} self
 */
// ? Read
const trim = (self) => {
  if (self[LENGTH] > self[MAX]) {
    // 从尾部按序删除节点
    for (
      let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;

    ) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};

/**
 * 删除指定节点
 * @param {*} self
 * @param {*} node
 */
// ? Read
const del = (self, node) => {
  if (node) {
    const hit = node.value;
    // 调用卸载回调
    if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);

    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key); // 从 Map 移除
    self[LRU_LIST].removeNode(node); // 从 List 移除
  }
};

/**
 * 缓存节点
 */
// ? Read
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key; //            Cache 哈希键
    this.value = value; //        Cache 值
    this.length = length; //      数据大小
    this.now = now; //            缓存最后访问时间
    this.maxAge = maxAge || 0; // 缓存过期期限
  }
}

/**
 * 遍历单步
 * @param {*} self
 * @param {*} fn
 * @param {*} node
 * @param {*} thisp
 */
// ? Read
const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self, hit)) {
    // 过期了移除
    del(self, node);
    // ALLOW_STALE = true 时才 hit
    if (!self[ALLOW_STALE]) hit = undefined;
  }
  // fn(value, key, cache)
  if (hit) fn.call(thisp, hit.value, hit.key, self);
};

module.exports = LRUCache;
