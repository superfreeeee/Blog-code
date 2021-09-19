import { EventEmitterListener } from './interface';

/**
 * 事件触发器
 * E 为事件类型，默认 string
 * T 为传递数据类型，默认为 void
 */
class EventEmitter<E extends string, T = void> {
  private listenersMap: Map<E, Set<EventEmitterListener<T>>> = null;

  private ensureListenersMap(event: E): void {
    if (!this.listenersMap) {
      this.listenersMap = new Map();
    }
    if (!this.listenersMap.has(event)) {
      this.listenersMap.set(event, new Set());
    }
  }

  on(event: E, listener: EventEmitterListener<T>) {
    this.ensureListenersMap(event);
    const listeners = this.listenersMap.get(event);
    if (!listeners.has(listener)) {
      listeners.add(listener);
    }
  }

  off(event: E, listener: EventEmitterListener<T>) {
    if (this.listenersMap.has(event)) {
      const listeners = this.listenersMap.get(event);
      if (listeners.has(listener)) {
        listeners.delete(listener);
      }
    }
  }

  emit(event: E, param: T) {
    if (this.listenersMap.has(event)) {
      const listeners = this.listenersMap.get(event);
      listeners.forEach((listener) => {
        listener(param);
      });
    }
  }

  once(event: E, listener: EventEmitterListener<T>) {
    const wrappedListener: EventEmitterListener<T> = (param: T) => {
      listener(param);
      this.off(event, wrappedListener);
    };
    this.on(event, wrappedListener);
  }
}

export default EventEmitter;
