import { parseRootMargin, shallowCompare } from './utils';
import { Instance, TargetNode } from './types';

export const observerElementsMap = new Map<IntersectionObserver | undefined, Set<Instance>>();

export function getPooled(options: IntersectionObserverInit = {}) {}

export function findObserverElement(observer: IntersectionObserver, entry: IntersectionObserverEntry) {}

export function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {}

export function createObserver(options: IntersectionObserverInit): IntersectionObserver {}

export function observeElement(element: Instance) {}

export function unobserveElement(element: Instance, target: TargetNode) {}
