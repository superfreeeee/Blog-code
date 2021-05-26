function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
/* 纯组件：React.PureComponent 类组件 */
// props    属性
// context  上下文
// refs     引用
// updater  ???
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

// PureComponent 继承 ComponentDummy 继承 Component
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
Object.assign(pureComponentPrototype, Component.prototype);

/* isPureReactComponent 标志表明为纯组件 */
pureComponentPrototype.isPureReactComponent = true;
