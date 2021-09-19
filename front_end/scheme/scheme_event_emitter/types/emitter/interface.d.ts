export interface EventEmitterListener<P = void> {
    (param: P): void;
}
