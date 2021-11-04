import { useRef, useCallback, useMemo } from 'react';
import { createObserver, observeElement, unobserveElement } from './observer';
import { ChangeHandler, Options, Unobserve, Instance } from './types';
import { thresholdCacheKey } from './utils';

export const useIntersectionObserver = (
  onChange: ChangeHandler,
  { root, rootMargin, threshold, disabled }: Options = {}
): [React.RefCallback<any>, Unobserve] => {
  // ...

  /**
   * 置于目标组件上的 callback ref（会调用两次）
   *   node = null   => unobserve
   *   node = target => unobserve + target = node + observe
   */
  const setRef = useCallback<React.RefCallback<any>>(
    (node) => {
      const isNewNode = node != null && instanceRef.current.target !== node;

      // observer 实例不存在
      if (!observer) {
        unobserve();
      }

      // 返回新的 targetNode
      if (isNewNode) {
        unobserve();
        instanceRef.current.target = node;
        observe();
      }

      if (!node) {
        unobserve();
        instanceRef.current.target = undefined;
      }
    },
    [observer]
  );

  return [setRef, unobserve];
};
