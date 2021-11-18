/* 加入队列 */
// if reqs[key] => 简单加入队列
// else         => 创建队列 & 返回启动函数
function inflight(key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb);
    return null;
  } else {
    reqs[key] = [cb];
    return makeres(key);
  }
}
