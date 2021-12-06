// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
// grab a reference to node's real process object right away
var process = global.process;

/**
 * 检验当前 process 是否为 node 的 process
 * @param {*} process
 * @returns
 */
// ? Read
const processOk = function (process) {
  return (
    process &&
    typeof process === 'object' &&
    typeof process.removeListener === 'function' &&
    typeof process.emit === 'function' &&
    typeof process.reallyExit === 'function' &&
    typeof process.listeners === 'function' &&
    typeof process.kill === 'function' &&
    typeof process.pid === 'number' &&
    typeof process.on === 'function'
  );
};

// some kind of non-node environment, just no-op
/* istanbul ignore if */
if (!processOk(process)) {
  // 1. 非 node 环境
  module.exports = function () {};
} else {
  var assert = require('assert');
  var signals = require('./signals.js');
  var isWin = /^win/i.test(process.platform);

  // 2. EventEmitter 获取
  var EE = require('events');
  /* istanbul ignore if */
  if (typeof EE !== 'function') {
    EE = EE.EventEmitter;
  }

  // 挂载在 process.__signal_exit_emitter__ 上
  var emitter;
  if (process.__signal_exit_emitter__) {
    emitter = process.__signal_exit_emitter__;
  } else {
    emitter = process.__signal_exit_emitter__ = new EE();
    emitter.count = 0;
    emitter.emitted = {};
  }

  // Because this emitter is a global, we have to check to see if a
  // previous version of this library failed to enable infinite listeners.
  // I know what you're about to say.  But literally everything about
  // signal-exit is a compromise with evil.  Get used to it.
  // ? listener 无上限
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }

  /**
   * 默认导出函数：exit 事件监听接口
   * @param {*} cb
   * @param {*} opts
   * @returns
   */
  // ? Read
  module.exports = function (cb, opts) {
    /* istanbul ignore if */
    if (!processOk(global.process)) {
      return;
    }
    assert.equal(
      typeof cb,
      'function',
      'a callback must be provided for exit handler'
    );

    // 挂载 emitter
    if (loaded === false) {
      load();
    }

    // ========== 参数校验 ==========

    var ev = 'exit';
    if (opts && opts.alwaysLast) {
      ev = 'afterexit';
    }

    // 取消监听
    var remove = function () {
      emitter.removeListener(ev, cb);
      if (
        emitter.listeners('exit').length === 0 &&
        emitter.listeners('afterexit').length === 0
      ) {
        // 卸载 emitter
        unload();
      }
    };
    // 挂载 exit 事件
    emitter.on(ev, cb);

    return remove;
  };

  /**
   * 卸载 emitter
   * @returns
   */
  // ? Read
  var unload = function unload() {
    if (!loaded || !processOk(global.process)) {
      return;
    }
    loaded = false;

    // 从 process 上卸载所有监听函数
    signals.forEach(function (sig) {
      try {
        process.removeListener(sig, sigListeners[sig]);
      } catch (er) {}
    });
    process.emit = originalProcessEmit;
    process.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  };
  module.exports.unload = unload;

  /**
   * 触发 emitter
   * @param {*} event
   * @param {*} code
   * @param {*} signal
   * @returns
   */
  // ? Read
  var emit = function emit(event, code, signal) {
    /* istanbul ignore if */
    if (emitter.emitted[event]) {
      // 已触发事件则忽略
      return;
    }
    // 触发事件
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  };

  /**
   * 监听函数表
   * signal => callback
   */
  // ? Read
  // { <signal>: <listener fn>, ... }
  var sigListeners = {};
  signals.forEach(function (sig) {
    sigListeners[sig] = function listener() {
      /* istanbul ignore if */
      if (!processOk(global.process)) {
        // 忽略非 node 程序
        return;
      }
      // If there are no other listeners, an exit is coming!
      // Simplest way: remove us and then re-send the signal.
      // We know that this will kill the process, so we can
      // safely emit now.
      var listeners = process.listeners(sig);
      if (listeners.length === emitter.count) {
        // 只剩当前库注册的监听函数时才触发
        unload();
        // 触发 exit、afterexit 事件
        emit('exit', null, sig);
        /* istanbul ignore next */
        emit('afterexit', null, sig);
        /* istanbul ignore next */
        if (isWin && sig === 'SIGHUP') {
          // "SIGHUP" throws an `ENOSYS` error on Windows,
          // so use a supported signal instead
          sig = 'SIGINT';
        }
        /* istanbul ignore next */
        // 重新出发 kill 事件
        process.kill(process.pid, sig);
      }
    };
  });

  // ? getter signals
  module.exports.signals = function () {
    return signals;
  };

  var loaded = false;

  /**
   * 挂载 emitter
   *   count : 挂载次数
   *   emit  :
   *   reallyExit :
   * @returns
   */
  // ? Read
  var load = function load() {
    if (loaded || !processOk(global.process)) {
      return;
    }
    loaded = true;

    // This is the number of onSignalExit's that are in play.
    // It's important so that we can count the correct number of
    // listeners on signals, and don't wait for the other one to
    // handle it instead of us.
    emitter.count += 1;

    signals = signals.filter(function (sig) {
      try {
        // 监听 process 事件
        process.on(sig, sigListeners[sig]);
        return true;
      } catch (er) {
        return false;
      }
    });

    process.emit = processEmit;
    process.reallyExit = processReallyExit;
  };
  module.exports.load = load;

  var originalProcessReallyExit = process.reallyExit;
  /**
   * 退出程序，退完换 originalProcess 退
   * @param {*} code
   * @returns
   */
  // ? Read
  var processReallyExit = function processReallyExit(code) {
    /* istanbul ignore if */
    if (!processOk(global.process)) {
      return;
    }
    process.exitCode = code || /* istanbul ignore next */ 0;
    emit('exit', process.exitCode, null);
    /* istanbul ignore next */
    emit('afterexit', process.exitCode, null);
    /* istanbul ignore next */
    originalProcessReallyExit.call(process, process.exitCode);
  };

  var originalProcessEmit = process.emit;
  /**
   * 触发 process 事件
   * @param {*} ev
   * @param {*} arg
   * @returns
   */
  // ? Read
  var processEmit = function processEmit(ev, arg) {
    // process 事件触发
    if (ev === 'exit' && processOk(global.process)) {
      /* istanbul ignore else */
      if (arg !== undefined) {
        process.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      /* istanbul ignore next */
      emit('exit', process.exitCode, null);
      /* istanbul ignore next */
      emit('afterexit', process.exitCode, null);
      /* istanbul ignore next */
      return ret;
    } else {
      return originalProcessEmit.apply(this, arguments);
    }
  };
}
