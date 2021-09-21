// 顶层包装类
var topLevelRootCounter = 1;
var TopLevelWrapper = function () {
  this.rootID = topLevelRootCounter++;
};

TopLevelWrapper.prototype.isReactComponent = {};
if (process.env.NODE_ENV !== 'production') {
  TopLevelWrapper.displayName = 'TopLevelWrapper';
}

TopLevelWrapper.prototype.render = function () {
  return this.props.child;
};

TopLevelWrapper.isReactTopLevelWrapper = true;
