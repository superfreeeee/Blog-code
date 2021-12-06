/**
 * 拷贝 from.property 到 to
 * @param {*} to
 * @param {*} from
 * @param {*} property
 * @param {*} ignoreNonConfigurable
 * @returns
 */
// ? Read
const copyProperty = (to, from, property, ignoreNonConfigurable) => {
  // `Function#length` should reflect the parameters of `to` not `from` since we keep its body.
  // `Function#prototype` is non-writable and non-configurable so can never be modified.
  if (property === 'length' || property === 'prototype') {
    return;
  }

  // `Function#arguments` and `Function#caller` should not be copied. They were reported to be present in `Reflect.ownKeys` for some devices in React Native (#41), so we explicitly ignore them here.
  if (property === 'arguments' || property === 'caller') {
    return;
  }

  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);

  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }

  // 将 fromDesc 定义到 to 上
  Object.defineProperty(to, property, fromDescriptor);
};

/**
 * 检查是否可进行属性拷贝
 * @param {*} toDescriptor
 * @param {*} fromDescriptor
 * @returns
 */
// ? Read
// `Object.defineProperty()` throws if the property exists, is not configurable and either:
// - one its descriptors is changed
// - it is non-writable and its value is changed
const canCopyProperty = function (toDescriptor, fromDescriptor) {
  // toDescriptor 未定义
  // || toDescriptor.configurable = true 可配置
  // || writable、enumerable、configurable 相同
  return (
    toDescriptor === undefined ||
    toDescriptor.configurable ||
    (toDescriptor.writable === fromDescriptor.writable &&
      toDescriptor.enumerable === fromDescriptor.enumerable &&
      toDescriptor.configurable === fromDescriptor.configurable &&
      (toDescriptor.writable || toDescriptor.value === fromDescriptor.value))
  );
};

/**
 * 继承 prototype
 */
// ? Read
const changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }

  Object.setPrototypeOf(to, fromPrototype);
};

// ? Function.prototype 原始方法、name 封装
const wrappedToString = (withName, fromBody) =>
  `/* Wrapped ${withName}*/\n${fromBody}`;

const toStringDescriptor = Object.getOwnPropertyDescriptor(
  Function.prototype,
  'toString'
);
const toStringName = Object.getOwnPropertyDescriptor(
  Function.prototype.toString,
  'name'
);

/**
 * 修改 name、toString 属性
 * @param {*} to
 * @param {*} from
 * @param {*} name
 */
// ? Read
// We call `from.toString()` early (not lazily) to ensure `from` can be garbage collected.
// We use `bind()` instead of a closure for the same reason.
// Calling `from.toString()` early also allows caching it in case `to.toString()` is called several times.
const changeToString = (to, from, name) => {
  const withName = name === '' ? '' : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  // Ensure `to.toString.toString` is non-enumerable and has the same `same`
  Object.defineProperty(newToString, 'name', toStringName);
  Object.defineProperty(to, 'toString', {
    ...toStringDescriptor,
    value: newToString,
  });
};

/**
 * to 继承 from 的各项属性
 * @param {*} to
 * @param {*} from
 * @param {*} param2
 * @returns
 */
// ? Read
export default function mimicFunction(
  to,
  from,
  { ignoreNonConfigurable = false } = {}
) {
  const { name } = to;

  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }

  changePrototype(to, from);
  changeToString(to, from, name);

  return to;
}
