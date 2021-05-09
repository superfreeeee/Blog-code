// 维护更新队列并排程

export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {  // 重复 id 被忽略
    has[id] = true
    // 插入队列
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // 缓冲队列
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      // 在下一个 tick 刷新队列
      nextTick(flushSchedulerQueue)
    }
  }
}
