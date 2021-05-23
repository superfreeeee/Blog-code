const dynamicArgRE = /^\[.*\]$/

/* 获取插槽名称 */
function getSlotName (binding) {
  let name = binding.name.replace(slotRE, '')
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default'
    } else if (process.env.NODE_ENV !== 'production') {
      // unnamed v-slot warning ...
    }
  }
  return dynamicArgRE.test(name)
    // 动态命名插槽 [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // 静态命名插槽 name
    : { name: `"${name}"`, dynamic: false }
}