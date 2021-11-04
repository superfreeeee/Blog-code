import { useRef, useCallback, useMemo } from 'react';
import { createObserver, observeElement, unobserveElement } from './observer';
import { ChangeHandler, Options, Unobserve, Instance } from './types';
import { thresholdCacheKey } from './utils';

export const useIntersectionObserver = (
  onChange: ChangeHandler,
  { root, rootMargin, threshold, disabled }: Options = {}
): [React.RefCallback<any>, Unobserve] => {
  // ...

  // 取消观察方法（代理 unobserveElement 函数）
  const unobserve = useCallback(() => {
    if (instanceRef.current.target && observingRef.current) {
      unobserveElement(instanceRef.current, instanceRef.current.target);
      observingRef.current = false;
    }
  }, []);

  /**
   * 回调函数绑定
   *   避免写在 useEffect 里导致 onChange 改变时滞后
   */
  instanceRef.current.handleChange = function handleChange(event: IntersectionObserverEntry) {
    onChange(event, unobserve);
  };

  // ...
};
