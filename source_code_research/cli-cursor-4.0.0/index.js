import process from 'node:process';
import restoreCursor from 'restore-cursor';

let isHidden = false;

const cliCursor = {};

// 默认使用 stderr

/**
 * 显示游标
 * @param {*} writableStream
 * @returns
 */
// ? Read
cliCursor.show = (writableStream = process.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }

  isHidden = false;
  writableStream.write('\u001B[?25h');
};

/**
 * 隐藏游标
 * @param {*} writableStream
 * @returns
 */
cliCursor.hide = (writableStream = process.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }

  // 这老哥估计没搞清楚 restoreCursor 的作用。。。
  // 更优雅的写法应该是在外面注册并且只注册一次
  restoreCursor(); // 只调用一次有效
  isHidden = true;
  writableStream.write('\u001B[?25l');
};

/**
 * 游标开关切换
 * @param {*} force
 * @param {*} writableStream
 */
// ? Read
cliCursor.toggle = (force, writableStream) => {
  if (force !== undefined) {
    isHidden = force;
  }

  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};

export default cliCursor;
