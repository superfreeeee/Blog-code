import React from 'react';
import { findDOMNode } from 'react-dom';
import { createObserver, observeElement, unobserveElement } from './observer';
import { shallowCompare, isChildrenWithRef, hasOwnProperty, toString } from './utils';
import { ChangeHandler, Options, Instance, TargetNode } from './types';

const observerOptions = <const>['root', 'rootMargin', 'threshold'];

/**
 * options 参数预处理
 * @param props
 * @returns
 */
export const getOptions = (props: Props) => {
  return observerOptions.reduce<IntersectionObserverInit>((options, key) => {
    const isRootString = key === 'root' && toString.call(props.root) === '[object String]';

    return Object.assign(options, {
      [key]: isRootString ? document.querySelector(props[key] as string) : props[key],
    });
  }, {});
};

export default class ReactIntersectionObserver extends React.Component<Props, {}> implements Instance {
  // ...

  /**
   * 观察方法
   * @returns
   */
  observe = () => {
    // 不存在子节点 or disabled
    if (this.props.children == null || this.props.disabled) {
      return false;
    }
    if (!this.targetNode) {
      throw new Error(
        "ReactIntersectionObserver: Can't find DOM node in the provided children. Make sure to render at least one DOM node in the tree."
      );
    }

    // 获取 observer 实例
    this.observer = createObserver(getOptions(this.props));
    this.target = this.targetNode;
    observeElement(this);

    return true;
  };

  // ...
}

export * from './types';
