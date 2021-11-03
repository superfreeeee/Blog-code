import * as React from 'react';
import { IntersectionObserverProps, PlainChildrenProps } from './index';
import { observe } from './observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export class InView extends React.Component<IntersectionObserverProps | PlainChildrenProps, State> {
  // ...

  node: Element | null = null;
  _unobserveCb: (() => void) | null = null;

  /**
   * 观察节点
   * @returns
   */
  observeNode() {
    if (!this.node || this.props.skip) return;
    const { threshold, root, rootMargin, trackVisibility, delay } = this.props;

    this._unobserveCb = observe(this.node, this.handleChange, {
      threshold,
      root,
      rootMargin,
      trackVisibility,
      delay,
    });
  }

  // ...
}
