import EventEmitter from '../emitter';
import { Observable, ObservableListener } from './interface';

/**
 * 创建一个可观察对象
 * 内部使用 Proxy 代理
 * @param obj
 * @returns
 */
const createObservable = <T extends Object>(obj: T): T & Observable<T> => {
  const ON_DATA_UPDATE = 'ON_DATA_UPDATE';
  const emitter = new EventEmitter<string, T>();

  const proxy = new Proxy(
    Object.assign(obj, {
      subscribe(listener: ObservableListener<T>) {
        emitter.on(ON_DATA_UPDATE, listener);
      },
    }),
    {
      set(target, propKey, value, receiver) {
        const res = Reflect.set(target, propKey, value, receiver);
        emitter.emit(ON_DATA_UPDATE, target);
        return res;
      },
    }
  );
  return proxy;
};

export default createObservable;
