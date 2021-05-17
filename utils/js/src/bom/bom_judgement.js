/**
 * 浏览器环境检查
 */

// 检查用户是否在 Apple 设备上
export const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform)

// 检查是否支持触摸事件
export const touchSupported = () =>
  'ontouchstart' in window ||
  (window.DocumentTouch && window instanceof window.DocumentTouch)
