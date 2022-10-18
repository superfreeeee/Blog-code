export interface ExternalStore<T> {
  getState(): T;
  subscribe(listener: () => void): () => void; // return unmount
  dispatch(updater: T | ((prevState: T) => T)): void;
}

export class SimpleStore<T> implements ExternalStore<T> {
  state: T;

  private listeners: Set<() => void> = new Set();

  constructor(initialState: T) {
    this.state = initialState;

    this.getState = this.getState.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  getState() {
    return this.state;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  dispatch(updater: T | ((prevState: T) => T)) {
    this.state =
      typeof updater === 'function'
        ? (updater as (prevState: T) => T)(this.state)
        : updater;
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const createSimpleStore = <T>(initialState: T) =>
  new SimpleStore(initialState);
