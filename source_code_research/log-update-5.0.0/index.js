import process from 'node:process';
import ansiEscapes from 'ansi-escapes';
import cliCursor from 'cli-cursor';
import wrapAnsi from 'wrap-ansi';
import sliceAnsi from 'slice-ansi';

const defaultTerminalHeight = 24;

/**
 * 获取输出流宽度，默认 80
 * @param {*} stream
 * @returns
 */
// ? Read
const getWidth = (stream) => {
  const { columns } = stream;

  if (!columns) {
    return 80;
  }

  return columns;
};

const fitToTerminalHeight = (stream, text) => {
  const terminalHeight = stream.rows || defaultTerminalHeight;
  const lines = text.split('\n');

  const toRemove = lines.length - terminalHeight;
  if (toRemove <= 0) {
    return text;
  }

  return sliceAnsi(
    text,
    lines.slice(0, toRemove).join('\n').length + 1,
    text.length
  );
};

/**
 * 包装输出流
 * @param {*} stream
 * @param {*} param1
 * @returns
 */
// ? Read
export function createLogUpdate(stream, { showCursor = false } = {}) {
  let previousLineCount = 0; // 输出行数
  let previousWidth = getWidth(stream); // 屏幕宽度 // TODO: Bug => 宽度改变时存在多余换行
  let previousOutput = '';

  /**
   * 输出函数
   * @param  {...any} arguments_
   * @returns
   */
  // ? Read
  const render = (...arguments_) => {
    if (!showCursor) {
      cliCursor.hide();
    }

    let output = arguments_.join(' ') + '\n';
    output = fitToTerminalHeight(stream, output);
    const width = getWidth(stream);
    if (output === previousOutput && previousWidth === width) {
      // 输出相同  => 直接返回
      return;
    }

    previousOutput = output;
    previousWidth = width;
    output = wrapAnsi(output, width, {
      trim: false,
      hard: true,
      wordWrap: false,
    });
    // 删除前面几行再重新输出
    stream.write(ansiEscapes.eraseLines(previousLineCount) + output);
    previousLineCount = output.split('\n').length;
  };

  /**
   * 清理输出
   */
  // ? Read
  render.clear = () => {
    // 清理输出
    stream.write(ansiEscapes.eraseLines(previousLineCount));
    previousOutput = '';
    previousWidth = getWidth(stream);
    previousLineCount = 0;
  };

  /**
   * 固定输出
   */
  // ? Read
  render.done = () => {
    // 清理记录  => 等效于固定输出
    previousOutput = '';
    previousWidth = getWidth(stream);
    previousLineCount = 0;

    if (!showCursor) {
      cliCursor.show();
    }
  };

  return render;
}

// ? 默认封装 stdout
const logUpdate = createLogUpdate(process.stdout);
export default logUpdate;

// ? 封装 stderr 版本
export const logUpdateStderr = createLogUpdate(process.stderr);
