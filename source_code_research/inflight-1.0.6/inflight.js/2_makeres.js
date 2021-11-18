/* 创建启动函数 */
function makeres(key) {
  // 只执行一次
  return once(function RES() {
    // 记录回调队列
    var cbs = reqs[key];
    var len = cbs.length;
    var args = slice(arguments);

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      // 执行回调
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args);
      }
    } finally {
      if (cbs.length > len) {
        // 避免奇怪的人在执行回调的过程中加入新的函数
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len);
        // 下个 tick 再执行剩余回调
        process.nextTick(function () {
          RES.apply(null, args);
        });
      } else {
        // 清理资源
        delete reqs[key];
      }
    }
  });
}
