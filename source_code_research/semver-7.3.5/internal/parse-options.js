// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const opts = ['includePrerelease', 'loose', 'rtl'];

/**
 * 解析 SemVer 类配置选项
 * @param {*} options
 * @returns
 */
// ? Read
const parseOptions = (options) =>
  !options
    ? {} // 默认
    : typeof options !== 'object'
    ? { loose: true } // 非 object
    : opts
        .filter((k) => options[k]) // 有效参数过滤
        .reduce((options, k) => {
          options[k] = true; // 都是标志类型
          return options;
        }, {});
module.exports = parseOptions;
