import * as React from 'react';
import { IntersectionObserverProps, PlainChildrenProps } from './index';
import { observe } from './observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export class InView extends React.Component<IntersectionObserverProps | PlainChildrenProps, State> {
  // ...

  handleChange = (inView: boolean, entry: IntersectionObserverEntry) => {
    // triggerOnce 只触发一次
    if (inView && this.props.triggerOnce) {
      this.unobserve();
    }

    // render props
    if (!isPlainChildren(this.props)) {
      this.setState({ inView, entry });
    }

    // 调用回调
    if (this.props.onChange) {
      this.props.onChange(inView, entry);
    }
  };

  // ...
}
