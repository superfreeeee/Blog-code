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

  useEffect(() => {
    // update 时重置 inView
    if (!unobserve.current && state.entry && !triggerOnce && !skip) {
      setState({
        inView: !!initialInView,
      });
    }
  });

  // 返回结果
  const result = [setRef, state.inView, state.entry] as InViewHookResponse;

  result.ref = result[0];
  result.inView = result[1];
  result.entry = result[2];

  return result;
}
