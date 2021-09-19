export interface ObservableListener<T> {
    (data: T): void;
}
export interface Observable<T> {
    subscribe(listener: ObservableListener<T>): void;
}
