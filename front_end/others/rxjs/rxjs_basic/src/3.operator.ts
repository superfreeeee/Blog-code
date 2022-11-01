import {
  concatAll,
  filter,
  interval,
  map,
  mergeAll,
  of,
  switchAll,
  take,
} from 'rxjs';
import { createTestWrapper } from './utils';

const testWrapper = createTestWrapper();

/**
 * 0. Marble Diagram
 */

/**
 * 1. map
 */
// testWrapper(() => {
//   of(1, 2, 3)
//     .pipe(map((x) => x * 10))
//     .subscribe(console.log);
// });

/**
 * 2. filter + take
 */
// testWrapper(() => {
//   interval(100)
//     .pipe(
//       filter((x) => x > 3),
//       take(5)
//     )
//     .subscribe(console.log);
// });

/**
 * 3. Higher Order Observable
 * = Nested Observable
 */
// testWrapper(() => {
// of(1, 2, 3)
//   .pipe(map((v) => interval(100)))
//   .subscribe(console.log);

// of(1, 2, 3)
//   .pipe(
//     map((v) =>
//       interval(100).pipe(
//         map((s) => `${v}-${s}`),
//         take(3)
//       )
//     )
//   )
//   .subscribe((o) => {
//     o.subscribe(console.log);
//   });
// });

/**
 * 4. Join Operators
 */
// testWrapper(() => {
of(1, 2, 3)
  .pipe(
    map((v) =>
      interval(100).pipe(
        map((s) => `${v}-${s}`),
        take(3)
      )
    ),
    // concatAll()
    // mergeAll()
    switchAll()
  )
  .subscribe(console.log);
// });
