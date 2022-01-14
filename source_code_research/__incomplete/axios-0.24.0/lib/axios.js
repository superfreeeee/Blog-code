'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * 创建 axios 实例方法
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
// ? Read
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  // 等价于 instance = context.request.bind(context)
  var instance = bind(Axios.prototype.request, context);

  // 将 Axios.prototype, Axios 实例扩展到 instance 对象上
  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    // 将新 config 与 defaults 合并
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// ? 全局实例
// Create the default instance to be exported
var axios = createInstance(defaults);

// ? 静态属性
// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// ? 取消相关
// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
axios.VERSION = require('./env/data').version;

// ? 一次发起多个请求：使用 Promise.all
// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

// ? 默认导出全局实例
module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
