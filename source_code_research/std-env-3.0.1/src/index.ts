import { detectProvider, ProviderName } from './providers'

export type { ProviderName, ProviderInfo } from './providers'

// 全局 process 对象 || {}
const processShim = typeof process !== 'undefined' ? process : {} as typeof process
// end := process.env
const envShim = processShim.env || {}
const providerInfo = detectProvider(envShim)
// nodeENV := env.NODE_ENV
const nodeENV = envShim.NODE_ENV || ''

// ? 平台 := process.platform
/** Value of process.platform */
export const platform = processShim.platform

/** Current provider name */
export const provider: ProviderName = providerInfo.name

// =============== 运行模式（TTY/CI） ===============
// ? 当前是否属于 CI 环境 := env.CI
/** Detect if `CI` environment variable is set or a provider CI detected */
export const isCI = toBoolean(envShim.CI) || providerInfo.ci !== false

// ? 是否存在输出终端 TTY := process.stdout.isTTY
/** Detect if stdout.TTY is available */
export const hasTTY = toBoolean(processShim.stdout && processShim.stdout.isTTY)

// ? 是否存在全局 window 对象 := window
/** Detect if global `window` object is available */
export const hasWindow = typeof window !== 'undefined'

// =============== 运行环境（开发/生产/测试/DEBUG） ===============
// ? 是否为 debug 模式 := env.DEBUG
/** Detect if `DEBUG` environment variable is set */
export const isDebug = toBoolean(envShim.DEBUG)

// ? 是否为测试模式 := env.TEST
/** Detect if `NODE_ENV` environment variable is `test` */
export const isTest = toBoolean(envShim.TEST)

// ? 是否为生产环境 := NODE_ENV === 'production'
/** Detect if `NODE_ENV` environment variable is `production` */
export const isProduction = nodeENV === 'production'

// ? 是否为开发环境 := NODE_ENV === 'dev' | 'development'
/** Detect if `NODE_ENV` environment variable is `dev` or `development` */
export const isDevelopment = nodeENV === 'dev' || nodeENV === 'development'

// ? 是否为限制环境 := env.MINIMAL | isCI | isTest | !hasTTY
/** Detect if MINIMAL environment variable is set, running in CI or test or TTY is unavailable */
export const isMinimal = toBoolean(envShim.MINIMAL) || isCI || isTest || !hasTTY

// =============== 系统 ===============
// ? 是否为 window 系统
/** Detect if process.platform is Windows */
export const isWindows = /^win/i.test(platform)

// ? 是否为 linux 系统
/** Detect if process.platform is Linux */
export const isLinux = /^linux/i.test(platform)

// ? 是否为 macOS 系统
/** Detect if process.platform is macOS (darwin kernel) */
export const isMacOS = /^darwin/i.test(platform)

// -- Utils --

/**
 * 运行参数解析
 *   'false' 以外非空则为 true
 * @param val 
 * @returns 
 */
function toBoolean(val) {
  return val ? (val !== 'false') : false
}
