// 取消观察方法
export type Unobserve = () => void;

// 回调函数
export type ChangeHandler = (entry: IntersectionObserverEntry, unobserve: Unobserve) => void;

// 目标元素
export type TargetNode = Element;

// 配置选项
export interface Options {
  root?: string | Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  disabled?: boolean;
}

/**
 * 观察目标实例
 *   handleChange 响应回调
 *   observer IntersectionObserver实例
 *   target 观察目标
 */
export interface Instance {
  handleChange: (event: IntersectionObserverEntry) => void;
  observer?: IntersectionObserver;
  target?: TargetNode;
}
