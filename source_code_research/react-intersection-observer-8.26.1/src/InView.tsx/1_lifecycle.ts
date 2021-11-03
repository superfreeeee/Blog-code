import * as React from 'react';
import { IntersectionObserverProps, PlainChildrenProps } from './index';
import { observe } from './observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

/**
 * 非 props render
 * @param props
 * @returns
 */
function isPlainChildren(props: IntersectionObserverProps | PlainChildrenProps): props is PlainChildrenProps {
  return typeof props.children !== 'function';
}

export class InView extends React.Component<IntersectionObserverProps | PlainChildrenProps, State> {
  // ...

  // 构造时初始化 state
  constructor(props: IntersectionObserverProps | PlainChildrenProps) {
    super(props);
    this.state = {
      inView: !!props.initialInView,
      entry: undefined,
    };
  }

  // 更新时 props 改变则重新观察
  componentDidUpdate(prevProps: IntersectionObserverProps) {
    if (
      prevProps.rootMargin !== this.props.rootMargin ||
      prevProps.root !== this.props.root ||
      prevProps.threshold !== this.props.threshold ||
      prevProps.skip !== this.props.skip ||
      prevProps.trackVisibility !== this.props.trackVisibility ||
      prevProps.delay !== this.props.delay
    ) {
      this.unobserve();
      this.observeNode();
    }
  }

  // 卸载时取消观察
  componentWillUnmount() {
    this.unobserve();
    this.node = null;
  }

  // 渲染
  render() {
    // props render
    if (!isPlainChildren(this.props)) {
      const { inView, entry } = this.state;
      return this.props.children({ inView, entry, ref: this.handleNode });
    }

    const {
      children,
      as,
      tag,
      triggerOnce,
      threshold,
      root,
      rootMargin,
      onChange,
      skip,
      trackVisibility,
      delay,
      initialInView,
      ...props
    } = this.props;

    return React.createElement(as || tag || 'div', { ref: this.handleNode, ...props }, children);
  }

  // ...
}
