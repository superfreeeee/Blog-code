import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

// 透过 query 方法获取 id 指向的 DOM 元素
const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})