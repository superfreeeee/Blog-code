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


  
  // ...
}
