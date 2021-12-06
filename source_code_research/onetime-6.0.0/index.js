import mimicFunction from 'mimic-fn';

/**
 * 记录回调函数调用次数
 * Map<Function, number> : func => count
 */
// ? Read
const calledFunctions = new WeakMap();

/**
 * 包装函数
 * @param {*} function_
 * @param {*} options
 * @returns
 */
// ? Read
const onetime = (function_, options = {}) => {
  if (typeof function_ !== 'function') {
    throw new TypeError('Expected a function');
  }

  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || '<anonymous>';

  const onetime = function (...arguments_) {
    // 递增自己的调用次数
    calledFunctions.set(onetime, ++callCount);

    if (callCount === 1) {
      // 第一次调用
      returnValue = function_.apply(this, arguments_);
      function_ = undefined;
    } else if (options.throw === true) {
      // throw 不允许重复调用
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }

    // 返回结果值
    return returnValue;
  };

  // 先 onetime 后 function_
  mimicFunction(onetime, function_);
  calledFunctions.set(onetime, callCount);

  return onetime;
};

// ? Read
// 获取函数调用次数
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(
      `The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`
    );
  }

  return calledFunctions.get(function_);
};

export default onetime;
