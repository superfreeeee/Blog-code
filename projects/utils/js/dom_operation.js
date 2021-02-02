/**
 * dom 相关函数应用
 */

// 回到顶部
export const goToTop = () => window.scrollTo(0, 0)

// 检查当前元素是否处于焦点
export const elementIsOnFocus = (el) => el === document.activeElement
