import * as React from 'react';
import { IntersectionObserverProps, PlainChildrenProps } from './index';
import { observe } from './observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export class InView extends React.Component<IntersectionObserverProps | PlainChildrenProps, State> {
  // ...


  
  // ...
}
