/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
/* 判断是否为 React 内置组件类型 */
function isInternalComponentType(type) {
  return typeof type === 'function' &&
    typeof type.prototype !== 'undefined' &&
    typeof type.prototype.mountComponent === 'function' &&
    typeof type.prototype.receiveComponent === 'function';
}