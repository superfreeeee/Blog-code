import { useRef, useCallback, useMemo } from 'react';
import { createObserver, observeElement, unobserveElement } from './observer';
import { ChangeHandler, Options, Unobserve, Instance } from './types';
import { thresholdCacheKey } from './utils';

const noop = () => {};

export const useIntersectionObserver = (
  onChange: ChangeHandler,
  { root, rootMargin, threshold, disabled }: Options = {}
): [React.RefCallback<any>, Unobserve] => {
  // ...

  // threshold 参数缓存
  const memoizedThreshold = useMemo(() => threshold, [thresholdCacheKey(threshold)]);

  /**
   * 维护 instance.observer: IntersectionObserver 实例
   */
  const observer = useMemo(
    () => {
      if (disabled) {
        unobserve();
        instanceRef.current.observer = undefined;
        return undefined;
      }

      // root 参数
      const rootOption = typeof root === 'string' ? document.querySelector(root) : root;

      const obs = createObserver({
        root: rootOption,
        rootMargin,
        threshold: memoizedThreshold,
      });

      instanceRef.current.observer = obs;

      // 重新观察
      unobserve(); // 保证 observing 标记已经清空
      observe();

      return obs;
    },
    // 构建参数是否改变
    [root, rootMargin, memoizedThreshold, disabled]
  );

  // ...
};
