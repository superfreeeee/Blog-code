'use strict';
// 注入 Yallist.prototype[Symbol.iterator] 迭代器
module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      // 按序遍历节点，yield 中断
      yield walker.value;
    }
  };
};
