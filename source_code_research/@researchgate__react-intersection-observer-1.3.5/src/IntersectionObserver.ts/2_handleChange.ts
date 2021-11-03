import React from 'react';
import { findDOMNode } from 'react-dom';
import { createObserver, observeElement, unobserveElement } from './observer';
import { shallowCompare, isChildrenWithRef, hasOwnProperty, toString } from './utils';
import { ChangeHandler, Options, Instance, TargetNode } from './types';

export default class ReactIntersectionObserver extends React.Component<Props, {}> implements Instance {
  // ...

  // Instance 回调函数 handleChange 定义
  handleChange = (event: IntersectionObserverEntry) => {
    this.props.onChange(event, this.externalUnobserve);
  };

  // 供外部使用者调用的卸载方法
  externalUnobserve = () => {
    if (this.targetNode) {
      this.unobserve(this.targetNode);
    }
  };

  // ...
}

export * from './types';
