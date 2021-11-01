function delegate(elements, selector, type, callback, useCapture) {
  // 监听元素对象
  if (typeof elements.addEventListener === 'function') {
      return _delegate.apply(null, arguments);
  }

  // 对应 4 参数形式
  if (typeof type === 'function') {
      return _delegate.bind(null, document).apply(null, arguments);
  }

  // 根据 CSS 选择器选择元素集合
  if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements);
  }

  return Array.prototype.map.call(elements, function (element) {
      return _delegate(element, selector, type, callback, useCapture);
  });
}