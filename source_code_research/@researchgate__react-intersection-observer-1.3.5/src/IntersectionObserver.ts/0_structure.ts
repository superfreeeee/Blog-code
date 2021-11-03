import React from 'react';
import { findDOMNode } from 'react-dom';
import { createObserver, observeElement, unobserveElement } from './observer';
import { shallowCompare, isChildrenWithRef, hasOwnProperty, toString } from './utils';
import { ChangeHandler, Options, Instance, TargetNode } from './types';

interface Props extends Options {
  children?: React.ReactElement | null;
  onChange: ChangeHandler;
}

export default class ReactIntersectionObserver extends React.Component<Props, {}> implements Instance {
  static displayName = 'IntersectionObserver';

  private targetNode?: TargetNode;
  private prevTargetNode?: TargetNode;
  public target?: TargetNode;
  public observer?: IntersectionObserver;

  handleChange = (event: IntersectionObserverEntry) => {};

  handleNode = <T extends React.ReactInstance | null | undefined>(target: T) => {};

  observe = () => {};

  unobserve = (target: TargetNode) => {};

  externalUnobserve = () => {};

  getSnapshotBeforeUpdate(prevProps: Props) {}

  componentDidUpdate(_: any, __: any, relatedPropsChanged: boolean) {}

  componentDidMount() {}

  componentWillUnmount() {}

  render() {}
}

export * from './types';
