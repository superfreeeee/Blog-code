// 虚拟 dom 组件选项

export interface VNodeComponentOptions {
  Ctor: typeof Vue;
  propsData?: object;
  listeners?: object;
  children?: VNode[];
  tag?: string;
}