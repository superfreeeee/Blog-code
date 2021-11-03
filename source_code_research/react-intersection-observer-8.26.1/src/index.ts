import * as React from 'react';
import { InView } from './InView';
export { InView } from './InView';
export { useInView } from './useInView';
export { observe } from './observe';

export default InView;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ObserverInstanceCallback = (inView: boolean, entry: IntersectionObserverEntry) => void;

export type ObserverInstance = {
  inView: boolean;
  readonly callback: ObserverInstanceCallback;
  readonly element: Element;
  readonly observerId: string;
  readonly observer: IntersectionObserver;
  readonly thresholds: ReadonlyArray<number>;
};

interface RenderProps {
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
  ref: React.RefObject<any> | ((node?: Element | null) => void);
}

export interface IntersectionOptions extends IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  skip?: boolean;
  initialInView?: boolean;
  trackVisibility?: boolean;
  delay?: number;
}

export interface IntersectionObserverProps extends IntersectionOptions {
  children: (fields: RenderProps) => React.ReactNode;
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
}

export type PlainChildrenProps = IntersectionOptions & {
  children?: React.ReactNode;
  as?: React.ReactType<any>;
  tag?: React.ReactType<any>;
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
} & Omit<React.HTMLProps<HTMLElement>, 'onChange'>;

export type InViewHookResponse = [(node?: Element | null) => void, boolean, IntersectionObserverEntry | undefined] & {
  ref: (node?: Element | null) => void;
  inView: boolean;
  entry?: IntersectionObserverEntry;
};
