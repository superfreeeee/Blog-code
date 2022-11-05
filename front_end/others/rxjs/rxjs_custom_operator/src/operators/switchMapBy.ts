import {
  filter,
  mergeMap,
  Observable,
  OperatorFunction,
  takeUntil,
} from 'rxjs';

type Key<T> = keyof T;
type KeyMap<T, R> = (input: T) => R;
type Equal<T> = (input: T, other: T) => boolean;
type KeyOrKeyMap<T, R = any> = Key<T> | KeyMap<T, R> | Equal<T>;

const createPredicate = <T, R>(
  keyOrKeyMap: KeyOrKeyMap<T, R>,
): ((inputVal: T, otherVal: T) => boolean) => {
  if (typeof keyOrKeyMap !== 'function') {
    return (x: T, y: T) => x[keyOrKeyMap] === y[keyOrKeyMap];
  }

  if (keyOrKeyMap.length === 1) {
    const keyMap = keyOrKeyMap as (inputVal: T) => R;
    return (x: T, y: T) => keyMap(x) === keyMap(y);
  }

  return keyOrKeyMap as (inputVal: T, otherVal: T) => boolean;
};

export function switchMapBy<T, R>(
  key: Key<T>,
  mapFn: (val: T) => Observable<R>,
): OperatorFunction<T, R>;

export function switchMapBy<T, R, K>(
  keyMap: KeyMap<T, K>,
  mapFn: (val: T) => Observable<R>,
): OperatorFunction<T, R>;

export function switchMapBy<T, R, K>(
  equal: Equal<T>,
  mapFn: (val: T) => Observable<R>,
): OperatorFunction<T, R>;

// T = input, K = keyMapRes, R = output
export function switchMapBy<T, R, K = any>(
  keyOrKeyMap: KeyOrKeyMap<T, K>,
  mapFn: (val: T) => Observable<R>,
): OperatorFunction<T, R> {
  const predicate = createPredicate(keyOrKeyMap);

  return (input$) => {
    return input$.pipe(
      mergeMap((inputVal) => {
        return mapFn(inputVal).pipe(
          takeUntil(
            input$.pipe(filter((otherVal) => predicate(inputVal, otherVal))),
          ),
        );
      }),
    );
  };
}
