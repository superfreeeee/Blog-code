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
  // 卸载方法
  const unobserve = React.useRef<Function>();
  // 数据状态
  const [state, setState] = React.useState<State>({
    inView: !!initialInView,
  });

  // ...
}
