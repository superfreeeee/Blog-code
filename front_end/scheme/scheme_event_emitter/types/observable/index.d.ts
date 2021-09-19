import { Observable } from './interface';
/**
 * 创建一个可观察对象
 * 内部使用 Proxy 代理
 * @param obj
 * @returns
 */
declare const createObservable: <T extends Object>(obj: T) => T & Observable<T>;
export default createObservable;
