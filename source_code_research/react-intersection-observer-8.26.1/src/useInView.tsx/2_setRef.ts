import * as React from 'react';
import { InViewHookResponse, IntersectionOptions } from './index';
import { useEffect } from 'react';
import { observe } from './observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export function useInView({
  threshold,
  delay,
  trackVisibility,
  rootMargin,
  root,
  triggerOnce,
  skip,
  initialInView,
}: IntersectionOptions = {}): InViewHookResponse {
  // ...

  /**
   * ref callback
   */
  const setRef = React.useCallback(
    (node) => {
      // node 更新时（调用 setRef callback）取消观察
      if (unobserve.current !== undefined) {
        unobserve.current();
        unobserve.current = undefined;
      }

      // 跳过
      if (skip) return;

      // node 存在 => 重新观察
      if (node) {
        unobserve.current = observe(
          node,
          (inView, entry) => {
            setState({ inView, entry });

            // 触发一次
            if (entry.isIntersecting && triggerOnce && unobserve.current) {
              unobserve.current();
              unobserve.current = undefined;
            }
          },
          {
            root,
            rootMargin,
            threshold,
            trackVisibility,
            delay,
          }
        );
      }
    },
    [
      Array.isArray(threshold) ? threshold.toString() : threshold,
      root,
      rootMargin,
      triggerOnce,
      skip,
      trackVisibility,
      delay,
    ]
  );

  // ...
}
