import { useRef, useCallback, useMemo } from 'react';
import { createObserver, observeElement, unobserveElement } from './observer';
import { ChangeHandler, Options, Unobserve, Instance } from './types';
import { thresholdCacheKey } from './utils';

const noop = () => {};

export const useIntersectionObserver = (
  onChange: ChangeHandler,
  { root, rootMargin, threshold, disabled }: Options = {}
): [React.RefCallback<any>, Unobserve] => {
  // 标志：是否正在观察
  const observingRef = useRef(false);

  // 观察目标实例
  const instanceRef = useRef<Instance>({
    handleChange(event) {
      onChange(event, noop);
    },
  });

  // ...
};
