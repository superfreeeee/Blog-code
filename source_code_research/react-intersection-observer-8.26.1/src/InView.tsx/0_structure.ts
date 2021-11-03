import * as React from 'react';
import { IntersectionObserverProps, PlainChildrenProps } from './index';
import { observe } from './observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export class InView extends React.Component<IntersectionObserverProps | PlainChildrenProps, State> {
  static displayName = 'InView';
  static defaultProps = {
    threshold: 0,
    triggerOnce: false,
    initialInView: false,
  };

  constructor(props: IntersectionObserverProps | PlainChildrenProps) {}

  componentDidUpdate(prevProps: IntersectionObserverProps) {}

  componentWillUnmount() {}

  node: Element | null = null;
  _unobserveCb: (() => void) | null = null;

  observeNode() {}

  unobserve() {}

  handleNode = (node?: Element | null) => {};

  handleChange = (inView: boolean, entry: IntersectionObserverEntry) => {};

  render() {}
}
