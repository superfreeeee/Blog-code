/**
 * 1. basic attributes
 * @param {*} e
 */
const onKeydownBasic = (e) => {
  console.group('keyboard event');
  console.log('event', e);
  console.log('event.code', e.code);
  console.log('event.key', e.key);
  console.log('event.altKey', e.altKey);
  console.log('event.ctrlKey', e.ctrlKey);
  console.log('event.shiftKey', e.shiftKey);
  console.log('event.metaKey', e.metaKey);
  console.log('event.getModifierState()', e.getModifierState('Alt'));
  console.groupEnd();
};

// document.addEventListener('keydown', onKeydownBasic);

/**
 * 2. up and down
 * @param {*} e
 * @param {*} isDown
 */
const onKeydownUp = (e, isDown) => {
  console.log(`key: ${e.key} ${isDown ? 'down' : 'up'}`);
};

const testUpAndDown = () => {
  document.addEventListener('keydown', (e) => onKeydownUp(e, true));
  document.addEventListener('keyup', (e) => onKeydownUp(e, false));
};

// testUpAndDown();

/**
 * 3. test invoke once per down
 */
const onKeydownOnce = (e) => {
  !e.repeat && console.log(`press ${e.key}`);
};

// document.addEventListener('keydown', onKeydownOnce);

/**
 * 4. combine keydown
 */
class KeyboardHandler {
  static ALT = 'A';
  static SHIFT = 'S';
  static CTRL = 'C';
  static META = 'M';

  handlerConfigs = new Map();

  constructor() {
    this.listen();
  }

  addHandler(key, opts, handler) {
    const id = this.createId(key, opts);
    let handlers = this.handlerConfigs.get(id);
    if (!handlers) {
      handlers = new Set();
      this.handlerConfigs.set(id, handlers);
    }
    if (!handlers.has(handler)) {
      handlers.add(handler);
    }
  }

  removeHandler(key, opts, handler) {
    const id = this.createId(key, opts);
    const handlers = this.handlerConfigs.get(id) || new Set();
    if (handlers.has(handler)) {
      handlers.delete(handler);
    }
    if (handlers.size === 0) {
      this.handlerConfigs.delete(id);
    }
  }

  createId(key, opts) {
    const supportKeys = [KeyboardHandler.ALT, KeyboardHandler.SHIFT, KeyboardHandler.CTRL, KeyboardHandler.META];
    const config = {
      [KeyboardHandler.ALT]: false,
      [KeyboardHandler.SHIFT]: false,
      [KeyboardHandler.CTRL]: false,
      [KeyboardHandler.META]: false,
      ...opts,
    };
    let id = `${key.toLowerCase()}`;
    for (const key of supportKeys) {
      id += `-${key}${config[key] ? 1 : 0}`;
    }
    return id;
  }

  listen() {
    document.addEventListener('keydown', this.onKeydown);
  }

  stopListen() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = (e) => {
    const opts = {
      [KeyboardHandler.ALT]: e.altKey,
      [KeyboardHandler.SHIFT]: e.shiftKey,
      [KeyboardHandler.CTRL]: e.ctrlKey,
      [KeyboardHandler.META]: e.metaKey,
    };
    const id = this.createId(e.key, opts);
    const handlers = this.handlerConfigs.get(id);
    handlers && handlers.forEach((handler) => handler());
  };
}

const testCombineHandler = () => {
  const keyboardHandler = new KeyboardHandler();
  console.log(keyboardHandler);

  keyboardHandler.addHandler('a', {}, () => {
    console.log('press a');
  });
  keyboardHandler.addHandler('a', { [KeyboardHandler.SHIFT]: true }, () => {
    console.log('press a + shift');
  });
};

// testCombineHandler();

/**
 * 5. counting press time
 */
const pressedKeys = new Map();
const onKeydownTime = (e) => {
  if (!pressedKeys.has(e.key)) {
    pressedKeys.set(e.key, performance.now());
  }
};

const onKeyupTime = (e) => {
  const endTime = performance.now();
  const startTime = pressedKeys.get(e.key) || endTime;
  pressedKeys.delete(e.key);

  const pressTime = Math.round(endTime - startTime);

  console.log(`key=${e.key}, press time=${pressTime}`);
};

const testCountingTime = () => {
  document.addEventListener('keydown', onKeydownTime);
  document.addEventListener('keyup', onKeyupTime);
};

// testCountingTime();

/**
 * 6. counting delay
 */
let id = 0;
let time = 0;
const onKeydownDelay = (e) => {
  if (!time) {
    time = performance.now();
  }
  const current = performance.now();
  const delay = Math.round(current - time);
  console.log(`keydown(${id++}): ${e.key}, delay=${delay}`);
  time = current;
};

// document.addEventListener('keydown', onKeydownDelay);

/**
 * 7. schedule
 */
class KeyboardEventScheduler {
  delay;
  timer = null;

  keysConfig = new Map();
  activeKeys = new Set();

  constructor(delay = 1000) {
    this.delay = delay;
  }

  setHandler(key, handler) {
    let handlers = this.keysConfig.get(key);
    if (!handlers) {
      handlers = [];
      this.keysConfig.set(key, handlers);
    }
    handlers.push(handler);
  }

  clearHandler(key, handler) {
    const handlers = this.keysConfig.get(key);
    if (handlers.includes(handler)) {
      handlers.splice(handlers.indexOf(handler), 1);
    }
    if (handlers.length === 0) {
      this.keysConfig.delete(key);
    }
  }

  clearTimer() {
    console.log('clearTimer');
    clearInterval(this.timer);
    this.timer = null;
  }

  setTimer() {
    console.log('setTimer');
    const callHandlers = () => {
      this.activeKeys.forEach((key) => {
        this.keysConfig.get(key).forEach((handler) => handler());
      });
    };
    this.timer = setInterval(callHandlers, this.delay);
    callHandlers();
  }

  pressKey(key) {
    if (!this.activeKeys.has(key) && this.keysConfig.has(key)) {
      this.activeKeys.add(key);
      if (!this.timer) {
        this.setTimer();
      }
    }
  }

  releaseKey(key) {
    if (this.activeKeys.has(key)) {
      this.activeKeys.delete(key);
      if (this.activeKeys.size === 0) {
        this.clearTimer();
      }
    }
  }
}

const testSchedulerOrigin = () => {
  const box = document.querySelector('.board .box');
  let boxLeft = Number.parseInt(getComputedStyle(box).left);

  document.addEventListener('keydown', (e) => {
    console.log(`press at ${Math.round(performance.now())}`);
    if (e.key === 'ArrowRight') {
      boxLeft = Math.min(300 - 30, boxLeft + 30);
      box.style.left = `${boxLeft}px`;
    } else if (e.key === 'ArrowLeft') {
      boxLeft = Math.max(0, boxLeft - 30);
      box.style.left = `${boxLeft}px`;
    }
  });
};

const testScheduler = () => {
  const scheduler = new KeyboardEventScheduler(30);
  const box = document.querySelector('.board .box');
  let boxLeft = Number.parseInt(getComputedStyle(box).left);
  scheduler.setHandler('ArrowRight', () => {
    console.log(`press at ${Math.round(performance.now())}`);
    boxLeft = Math.min(300 - 30, boxLeft + 30);
    box.style.left = `${boxLeft}px`;
  });
  scheduler.setHandler('ArrowLeft', () => {
    console.log(`press at ${Math.round(performance.now())}`);
    boxLeft = Math.max(0, boxLeft - 30);
    box.style.left = `${boxLeft}px`;
  });

  document.addEventListener('keydown', (e) => {
    !e.repeat && scheduler.pressKey(e.key);
  });

  document.addEventListener('keyup', (e) => {
    scheduler.releaseKey(e.key);
  });
};

testSchedulerOrigin();
// testScheduler();

/**
 * 8. seperate scheduler
 */
const GCD = (a, b) => {
  if (a > b) {
    return GCD(b, a);
  }

  if (a === 0) {
    return b;
  }

  return GCD(b - a, a);
};

class KeyboardEventSeperateScheduler {
  delay;
  timer = null;

  handlerConfigs = new Map();
  activeKeys = new Set();

  setHandler(key, handler, delay) {
    let config = this.handlerConfigs.get(key);
    if (!config) {
      config = [];
      this.handlerConfigs.set(key, config);
    }
    if (!config.some((config) => config.handler === handler)) {
      config.push({ handler, delay, lastTime: -delay });
      if (!this.delay) {
        this.delay = delay;
      } else {
        this.delay = GCD(this.delay, delay);
      }
      console.log('this.delay', this.delay);
      this.resetTimer();
    }
  }

  clearHandler(key, handler) {
    const handlers = this.handlerConfigs.get(key) || new Set();
    if (handlers.includes(handler)) {
      handlers.splice(handlers.indexOf(handler), 1);
    }
    if (handlers.length === 0) {
      this.handlerConfigs.delete(key);
    }
  }

  resetTimer() {
    if (this.timer) {
      this.clearTimer();
      this.setTimer();
    }
  }

  clearTimer() {
    console.log('clearTimer');
    clearInterval(this.timer);
    this.timer = null;
  }

  setTimer() {
    console.log('setTimer');
    const callHandlers = () => {
      const activeTime = performance.now();
      this.activeKeys.forEach((key) => {
        this.handlerConfigs.get(key).forEach((config) => {
          const { delay, handler, lastTime } = config;
          if (activeTime - lastTime >= delay) {
            handler();
            config.lastTime = activeTime;
          }
        });
      });
    };
    this.timer = setInterval(callHandlers, this.delay);
    callHandlers();
  }

  pressKey(key) {
    if (!this.activeKeys.has(key) && this.handlerConfigs.has(key)) {
      this.activeKeys.add(key);
      if (!this.timer) {
        this.setTimer();
      }
    }
  }

  releaseKey(key) {
    if (this.activeKeys.has(key)) {
      this.activeKeys.delete(key);
      if (this.activeKeys.size === 0) {
        this.clearTimer();
      }
    }
  }
}

const testSeperateScheduler = () => {
  const scheduler = new KeyboardEventSeperateScheduler();
  const box = document.querySelector('.board .box');
  let boxLeft = Number.parseInt(getComputedStyle(box).left);
  scheduler.setHandler(
    'ArrowRight',
    () => {
      console.log(`press a at ${Math.round(performance.now())}`);
      boxLeft = Math.min(300 - 30, boxLeft + 30);
      box.style.left = `${boxLeft}px`;
    },
    40
  );
  scheduler.setHandler(
    'ArrowLeft',
    () => {
      console.log(`press b at ${Math.round(performance.now())}`);
      boxLeft = Math.max(0, boxLeft - 30);
      box.style.left = `${boxLeft}px`;
    },
    80
  );

  document.addEventListener('keydown', (e) => {
    scheduler.pressKey(e.key);
  });

  document.addEventListener('keyup', (e) => {
    scheduler.releaseKey(e.key);
  });
};

// testSeperateScheduler();
