const reqMap = new Map();
const invokeMap = new Map();

const inlight = (key, cb) => {
  if (reqMap.has(key)) {
    reqMap.get(key).push(cb);
    return null;
  } else {
    reqMap.set(key, [cb]);
    const invoke = createInvoke(key);
    invokeMap.set(key, invoke);
    return invoke;
  }
};

const createInvoke = (key) => {
  let called = false;
  let value;

  let invoke = (...args) => {
    const cbs = reqMap.get(key);
    const cbLen = cbs.length;
    let i = 0;
    try {
      cbs.forEach((cb, index) => {
        cb.apply(null, args);
        i = index + 1;
      });
    } finally {
      if (i === cbLen) {
        reqMap.delete(key);
        invokeMap.delete(key);
      } else {
        reqMap.set(key, cbs.slice(i));
        process.nextTick(() => {
          invoke(...args);
        });
      }
    }
  };

  return (...args) => {
    if (!called) {
      value = invoke(...args);
      called = true;
    }
    return value;
  };
};

export default inlight;
