/**
 * 缓存 key（使用 join 制作唯一键）
 * @param threshold 
 * @returns 
 */
export function thresholdCacheKey(threshold: Options['threshold']) {
  if (!threshold || typeof threshold === 'number') {
    return threshold;
  }

  return threshold.join(',');
}
