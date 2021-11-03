import React from 'react';
import { findDOMNode } from 'react-dom';
import { createObserver, observeElement, unobserveElement } from './observer';
import { shallowCompare, isChildrenWithRef, hasOwnProperty, toString } from './utils';
import { ChangeHandler, Options, Instance, TargetNode } from './types';

export default class ReactIntersectionObserver extends React.Component<Props, {}> implements Instance {
  // ...

  /**
   * callback ref
   * @param target
   */
  handleNode = <T extends React.ReactInstance | null | undefined>(target: T) => {
    const { children } = this.props;

    if (isChildrenWithRef<T>(children)) {
      // 重新绑定子节点 ref
      const childenRef = children.ref;
      if (typeof childenRef === 'function') {
        childenRef(target);
      } else if (childenRef && hasOwnProperty.call(childenRef, 'current')) {
        (childenRef as React.MutableRefObject<T>).current = target;
      }
    }

    // 维护目标 dom 元素到 targetNode
    this.targetNode = undefined;
    if (target) {
      // 重新获取目标节点元素
      const targetNode = findDOMNode(target);
      if (targetNode && targetNode.nodeType === 1) {
        this.targetNode = targetNode as Element;
      }
    }
  };

  // ...
}

export * from './types';
