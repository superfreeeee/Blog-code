import {
  filter,
  mergeMap,
  Observable,
  OperatorFunction,
  takeUntil,
} from 'rxjs';

export function switchMapBy<T, R>(
  keyOrKeyMap: keyof T | ((input$: T, other$: T) => boolean),
  mapFn: (val: T) => Observable<R>
): OperatorFunction<T, R> {
  const createPredicate = (input$: T) =>
    typeof keyOrKeyMap === 'function'
      ? (other$: T) => keyOrKeyMap(input$, other$)
      : (other$: T) => input$[keyOrKeyMap] === other$[keyOrKeyMap];

  return (input$) => {
    return input$.pipe(
      mergeMap((val) => {
        const predicate = createPredicate(val);

        return mapFn(val).pipe(takeUntil(input$.pipe(filter(predicate))));
      })
    );
  };
}
