import { useRef, useCallback, useMemo } from 'react';
import { createObserver, observeElement, unobserveElement } from './observer';
import { ChangeHandler, Options, Unobserve, Instance } from './types';
import { thresholdCacheKey } from './utils';

export const useIntersectionObserver = (
  onChange: ChangeHandler,
  { root, rootMargin, threshold, disabled }: Options = {}
): [React.RefCallback<any>, Unobserve] => {
  // ...

  // 观察方法
  const observe = () => {
    // 保证 observer、target 皆存在
    if (instanceRef.current.observer && instanceRef.current.target && !observingRef.current) {
      observeElement(instanceRef.current);
      observingRef.current = true;
    }
  };

  // ...
};
