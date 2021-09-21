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

  _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {/* ... */},

  /**
   * Renders a React component into the DOM in the supplied `container`.
   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.render
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactElement} nextElement Component element to render. 要渲染/挂载的 React 元素
   * @param {DOMElement} container DOM element to render into.      目标 DOM 元素(容器元素)
   * @param {?function} callback function triggered on completion   渲染完毕后的回调函数
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  /* ReactDOM.render 渲染 React 元素(挂载到容器上) */
  render: function (nextElement, container, callback) {
    return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
  },

  unmountComponentAtNode: function (container) {/* ... */},

  _mountImageIntoNode: function (markup, container, instance, shouldReuseMarkup, transaction) {/* ... */}
};