import React from 'react';
import { findDOMNode } from 'react-dom';
import { createObserver, observeElement, unobserveElement } from './observer';
import { shallowCompare, isChildrenWithRef, hasOwnProperty, toString } from './utils';
import { ChangeHandler, Options, Instance, TargetNode } from './types';

export default class ReactIntersectionObserver extends React.Component<Props, {}> implements Instance {
  // ...

  unobserve = (target: TargetNode) => {
    unobserveElement(this, target);
  };

  // ...
}

export * from './types';
