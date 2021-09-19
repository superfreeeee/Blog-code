import { EventEmitterListener } from './interface';
/**
 * 事件触发器
 * E 为事件类型，默认 string
 * T 为传递数据类型，默认为 void
 */
declare class EventEmitter<E extends string, T = void> {
    private listenersMap;
    private ensureListenersMap;
    on(event: E, listener: EventEmitterListener<T>): void;
    off(event: E, listener: EventEmitterListener<T>): void;
    emit(event: E, param: T): void;
    once(event: E, listener: EventEmitterListener<T>): void;
}
export default EventEmitter;
