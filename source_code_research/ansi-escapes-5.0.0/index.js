const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';
const isTerminalApp = process.env.TERM_PROGRAM === 'Apple_Terminal';

const ansiEscapes = {};

// ? Read
// esc [ <column> G          水平移动
// esc [ <row> ; <column> H  游标移动
ansiEscapes.cursorTo = (x, y) => {
  if (typeof x !== 'number') {
    throw new TypeError('The `x` argument is required');
  }

  if (typeof y !== 'number') {
    return ESC + (x + 1) + 'G';
  }

  return ESC + (y + 1) + ';' + (x + 1) + 'H';
};

// ? Read
ansiEscapes.cursorMove = (x, y) => {
  if (typeof x !== 'number') {
    throw new TypeError('The `x` argument is required');
  }

  let returnValue = '';

  if (x < 0) {
    // esc [ <n> D  后移（向左）
    returnValue += ESC + -x + 'D';
  } else if (x > 0) {
    // esc [ <n> C  前移（向右）
    returnValue += ESC + x + 'C';
  }

  if (y < 0) {
    // esc [ <n> A  上移
    returnValue += ESC + -y + 'A';
  } else if (y > 0) {
    // esc [ <n> B  下移
    returnValue += ESC + y + 'B';
  }

  return returnValue;
};

// ? esc [ <n> A  上移
ansiEscapes.cursorUp = (count = 1) => ESC + count + 'A';
// ? esc [ <n> B  下移
ansiEscapes.cursorDown = (count = 1) => ESC + count + 'B';
// ? esc [ <n> C  前移（向右）
ansiEscapes.cursorForward = (count = 1) => ESC + count + 'C';
// ? esc [ <n> D  后移（向左）
ansiEscapes.cursorBackward = (count = 1) => ESC + count + 'D';

// ? esc [ G  移动到最左列
ansiEscapes.cursorLeft = ESC + 'G';
// ? esc [ s  存储当前游标位置
ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
// ? esc [ u  恢复游标位置
ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
// ? esc [ 6n  获取游标位置信息
ansiEscapes.cursorGetPosition = ESC + '6n';
// ? esc [ E  移动到下一行的开头
ansiEscapes.cursorNextLine = ESC + 'E';
// ? esc [ F  移动到上一行的开头
ansiEscapes.cursorPrevLine = ESC + 'F';
ansiEscapes.cursorHide = ESC + '?25l';
ansiEscapes.cursorShow = ESC + '?25h';

// ? 擦除多行
ansiEscapes.eraseLines = (count) => {
  let clear = '';

  for (let i = 0; i < count; i++) {
    // 擦除整行后向上移动一行
    clear +=
      ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
  }

  if (count) {
    // 移动到最左侧
    clear += ansiEscapes.cursorLeft;
  }

  return clear;
};

// ? esc [ K   擦除到尾部
ansiEscapes.eraseEndLine = ESC + 'K';
// ? esc [ 1K  擦除到头部
ansiEscapes.eraseStartLine = ESC + '1K';
// ? esc [ 2K  擦除整行
ansiEscapes.eraseLine = ESC + '2K';
// ? esc [ J  擦除到屏幕尾
ansiEscapes.eraseDown = ESC + 'J';
// ? esc [ 1J 擦除到屏幕头
ansiEscapes.eraseUp = ESC + '1J';
// ? esc [ 2J 擦除整块屏幕
ansiEscapes.eraseScreen = ESC + '2J';
// ? esc [ S  向上滚动一行
ansiEscapes.scrollUp = ESC + 'S';
// ? esc [ T  向下滚动一行
ansiEscapes.scrollDown = ESC + 'T';

ansiEscapes.clearScreen = '\u001Bc';

// ? esc [ 3J 清除整个快取区域
ansiEscapes.clearTerminal =
  process.platform === 'win32'
    ? `${ansiEscapes.eraseScreen}${ESC}0f`
    : // 1. Erases the screen (Only done in case `2` is not supported)
      // 2. Erases the whole screen including scrollback buffer
      // 3. Moves cursor to the top-left position
      // More info: https://www.real-world-systems.com/docs/ANSIcode.html
      `${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;

ansiEscapes.beep = BEL;

ansiEscapes.link = (text, url) => {
  return [OSC, '8', SEP, SEP, url, BEL, text, OSC, '8', SEP, SEP, BEL].join('');
};

ansiEscapes.image = (buffer, options = {}) => {
  let returnValue = `${OSC}1337;File=inline=1`;

  if (options.width) {
    returnValue += `;width=${options.width}`;
  }

  if (options.height) {
    returnValue += `;height=${options.height}`;
  }

  if (options.preserveAspectRatio === false) {
    returnValue += ';preserveAspectRatio=0';
  }

  return returnValue + ':' + buffer.toString('base64') + BEL;
};

ansiEscapes.iTerm = {
  setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,

  annotation: (message, options = {}) => {
    let returnValue = `${OSC}1337;`;

    const hasX = typeof options.x !== 'undefined';
    const hasY = typeof options.y !== 'undefined';
    if (
      (hasX || hasY) &&
      !(hasX && hasY && typeof options.length !== 'undefined')
    ) {
      throw new Error(
        '`x`, `y` and `length` must be defined when `x` or `y` is defined'
      );
    }

    message = message.replace(/\|/g, '');

    returnValue += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

    if (options.length > 0) {
      returnValue += (
        hasX
          ? [message, options.length, options.x, options.y]
          : [options.length, message]
      ).join('|');
    } else {
      returnValue += message;
    }

    return returnValue + BEL;
  },
};

export default ansiEscapes;
