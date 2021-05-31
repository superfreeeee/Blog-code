/**
 * Mounting is the process of initializing a React component by creating its
 * representative DOM elements and inserting them into a supplied `container`.
 * Any prior content inside `container` is destroyed in the process.
 *
 *   ReactMount.render(
 *     component,
 *     document.getElementById('container')
 *   );
 *
 *   <div id="container">                   <-- Supplied `container`.
 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
 *       // ...                                 component.
 *     </div>
 *   </div>
 *
 * Inside of `container`, the first element rendered is the "reactRoot".
 */
var ReactMount = {
  TopLevelWrapper: TopLevelWrapper,

  _instancesByReactRootID: instancesByReactRootID,

  scrollMonitor: function (container, renderCallback) {/* ... */},

  _updateRootComponent: function (prevComponent, nextElement, nextContext, container, callback) {/* ... */},

  _renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {/* ... */},

  renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {/* ... */},

  /* 子树渲染并挂载到容器上 */
  _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    // 验证回调函数
    ReactUpdateQueue.validateCallback(callback, 'ReactDOM.render');
    // 验证 React 元素
    !React.isValidElement(nextElement)
      ? process.env.NODE_ENV !== 'production'
        ? invariant(false,
          'ReactDOM.render(): Invalid component element.%s',
          typeof nextElement === 'string'
            ? " Instead of passing a string like 'div', pass " + "React.createElement('div') or <div />."
            : typeof nextElement === 'function'
              ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.'
              : // Check if it quacks like an element
                nextElement != null && nextElement.props !== undefined
                ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.'
                : '')
        : _prodInvariant('39',
          typeof nextElement === 'string'
            ? " Instead of passing a string like 'div', pass " + "React.createElement('div') or <div />."
            : typeof nextElement === 'function'
              ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.'
              : nextElement != null && nextElement.props !== undefined
                ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' 
                : '') 
      : void 0;

    process.env.NODE_ENV !== 'production'
      ? warning(!container ||
          !container.tagName ||
          container.tagName.toUpperCase() !== 'BODY',
        'render(): Rendering components directly into document.body is ' +
          'discouraged, since its children are often manipulated by third-party ' +
          'scripts and browser extensions. This may lead to subtle ' +
          'reconciliation issues. Try rendering into a container element created ' +
          'for your app.')
      : void 0;

    // 创建顶层包装类
    var nextWrappedElement = React.createElement(TopLevelWrapper, {
      child: nextElement
    });

    // 获取上下文
    var nextContext;
    if (parentComponent) {
      // 存在父元素
      var parentInst = ReactInstanceMap.get(parentComponent);
      nextContext = parentInst._processChildContext(parentInst._context);
    } else {
      // 不存在父元素(首次渲染)
      nextContext = emptyObject;
    }

    // 获取顶层包装类 container._renderedComponent._hostContainerInfo._topLevelWrapper
    var prevComponent = getTopLevelWrapperInContainer(container);

    if (prevComponent) {
      var prevWrappedElement = prevComponent._currentElement;
      var prevElement = prevWrappedElement.props.child;

      // 如果已经存在实例，调用 shouldUpdateReactComponent 检查是否为更新组件
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        var publicInst = prevComponent._renderedComponent.getPublicInstance();
        // 渲染回调
        var updatedCallback = callback && function () {
          callback.call(publicInst);
        };
        /* 更新组件 */
        ReactMount._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);
        return publicInst;
      } else {
        /* 卸载组件 */
        ReactMount.unmountComponentAtNode(container);
      }
    }

    var reactRootElement = getReactRootElementInContainer(container);
    var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
    var containerHasNonRootReactChild = hasNonRootReactChild(container);

    // 测试用
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production'
        ? warning(!containerHasNonRootReactChild,
          'render(...): Replacing React-rendered children with a new root ' +
            'component. If you intended to update the children of this node, ' +
            'you should instead have the existing children update their state ' +
            'and render the new components instead of calling ReactDOM.render.')
        : void 0;

      if (!containerHasReactMarkup || reactRootElement.nextSibling) {
        var rootElementSibling = reactRootElement;
        while (rootElementSibling) {
          if (internalGetID(rootElementSibling)) {
            process.env.NODE_ENV !== 'production'
              ? warning(false,
                'render(): Target node has markup rendered by React, but there ' +
                  'are unrelated nodes as well. This is most commonly caused by ' +
                  'white-space inserted around server-rendered markup.')
              : void 0;
            break;
          }
          rootElementSibling = rootElementSibling.nextSibling;
        }
      }
    }

    // 渲染根组件
    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
    var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();
    if (callback) {
      callback.call(component);
    }
    return component;
  },

  render: function (nextElement, container, callback) {/* ... */},

  unmountComponentAtNode: function (container) {/* ... */},

  _mountImageIntoNode: function (markup, container, instance, shouldReuseMarkup, transaction) {/* ... */}
};