import React from 'react';
import { findDOMNode } from 'react-dom';
import { createObserver, observeElement, unobserveElement } from './observer';
import { shallowCompare, isChildrenWithRef, hasOwnProperty, toString } from './utils';
import { ChangeHandler, Options, Instance, TargetNode } from './types';

export default class ReactIntersectionObserver extends React.Component<Props, {}> implements Instance {
  // ...

  /**
   * 捕获前一次的 targetNode
   * 比较 props 是否改变
   * @param prevProps
   * @returns
   */
  getSnapshotBeforeUpdate(prevProps: Props) {
    this.prevTargetNode = this.targetNode;

    // 浅比较 props
    const relatedPropsChanged = observableProps.some((prop: typeof observableProps[number]) =>
      shallowCompare(this.props[prop], prevProps[prop])
    );
    if (relatedPropsChanged) {
      if (this.prevTargetNode) {
        if (!prevProps.disabled) {
          // props 改变、存在 targetNode、前一次非 disabled 时取消观察
          this.unobserve(this.prevTargetNode);
        }
      }
    }

    return relatedPropsChanged;
  }

  /**
   * update 生命周期
   * @param _
   * @param __
   * @param relatedPropsChanged
   */
  componentDidUpdate(_: any, __: any, relatedPropsChanged: boolean) {
    let targetNodeChanged = false;
    // props 没有改变的时候，检查 targetNode 是否改变
    if (!relatedPropsChanged) {
      targetNodeChanged = this.prevTargetNode !== this.targetNode;
      if (targetNodeChanged && this.prevTargetNode != null) {
        this.unobserve(this.prevTargetNode);
      }
    }

    // 重新观察目标
    if (relatedPropsChanged || targetNodeChanged) {
      this.observe();
    }
  }

  // mount 挂载时观察目标
  componentDidMount() {
    this.observe();
  }

  // unmount 卸载时取消观察
  componentWillUnmount() {
    if (this.targetNode) {
      this.unobserve(this.targetNode);
    }
  }

  // 渲染时传入 callback ref（handleNode 函数）
  render() {
    const { children } = this.props;

    return children != null
      ? React.cloneElement(React.Children.only(children), {
          ref: this.handleNode,
        })
      : null;
  }

  // ...
}

export * from './types';
