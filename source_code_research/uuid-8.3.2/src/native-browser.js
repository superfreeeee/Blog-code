// ? 取全局 crypto.randomUUID 函数
const randomUUID =
  typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);

export default { randomUUID };
