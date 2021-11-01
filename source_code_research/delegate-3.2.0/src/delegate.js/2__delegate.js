function _delegate(element, selector, type, callback, useCapture) {
  var listenerFn = listener.apply(this, arguments);

  element.addEventListener(type, listenerFn, useCapture);

  return {
    destroy: function () {
      element.removeEventListener(type, listenerFn, useCapture);
    },
  };
}
