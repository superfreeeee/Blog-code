import * as React from 'react';
import { IntersectionObserverProps, PlainChildrenProps } from './index';
import { observe } from './observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export class InView extends React.Component<IntersectionObserverProps | PlainChildrenProps, State> {
  // ...

  /**
   * targetNode callback ref
   * @param node
   */
  handleNode = (node?: Element | null) => {
    if (this.node) {
      // 清理旧观察着
      this.unobserve();

      // 为下一次重新观察初始化状态
      if (!node && !this.props.triggerOnce && !this.props.skip) {
        this.setState({ inView: !!this.props.initialInView, entry: undefined });
      }
    }
    this.node = node ? node : null;
    this.observeNode();
  };

  // ...
}
