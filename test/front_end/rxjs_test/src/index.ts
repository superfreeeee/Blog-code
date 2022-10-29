import {
  bindCallback,
  catchError,
  concatAll,
  EMPTY,
  exhaustAll,
  from,
  interval,
  map,
  mergeAll,
  Observable,
  of,
  startWith,
  Subject,
  switchAll,
  switchMap,
  take,
} from 'rxjs';

/**
 * 1.
 */
// const observable = new Observable((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 1000);
// });

// console.log('just before subscribe');

// observable.subscribe({
//   next(x) {
//     console.log('got value ' + x);
//   },
//   error(err) {
//     console.error('something wrong occurred: ' + err);
//   },
//   complete() {
//     console.log('done');
//   },
// });

// console.log('just after subscribe');

/**
 * 2.
 */
// function foo() {
//   console.log('Hello');
//   return 42;
// }

// const x = foo.call(null); // same as foo()
// console.log(x);
// const y = foo.call(null); // same as foo()
// console.log(y);

// const foo = new Observable((subscriber) => {
//   console.log('Hello');
//   subscriber.next(42);
//   subscriber.next(43);
// });

// foo.subscribe((x) => {
//   console.log(x);
// });
// foo.subscribe((y) => {
//   console.log(y);
// });

/**
 * 3.
 */
// const observable = from([10, 20, 30]);
// const observable = new Observable((subscriber) => {
//   subscriber.next(1);
//   const timer = setTimeout(() => {
//     console.log('hello');
//     subscriber.complete();
//     subscriber.next(2);
//     console.log('hello 2');
//   }, 1000);
//   subscriber.next(3);

//   return () => {
//     clearTimeout(timer);
//   };
// });

// const subscription = observable.subscribe({
//   next: (x) => console.log('next:', x),
//   error: (x) => console.log('error:', x),
//   complete: () => console.log('complete'),
// });

// Later:
// subscription.unsubscribe();

/**
 * 4.
 */

// const arr = of(1, 2, 3).pipe(
//   map((x) => {
//     console.log('hello map');
//     return x * x;
//   })
// );

// arr.subscribe((v) => console.log(`value: ${v}`));
// arr.subscribe((v) => console.log(`value: ${v}`));

/**
 * 5.
 */
// const subscription = interval(500).subscribe((count) => {
//   console.log(`after interval, count = ${count}, now = ${performance.now()}`);
// });

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 5000);

/**
 * 6.
 */
// of(1, 2, 3, 4)
//   .pipe(
//     map((id) =>
//       interval(1000).pipe(
//         take(4),
//         map((x) => `task ${id}: seq ${x}`)
//       )
//     ),
//     // mergeAll(),
//     // concatAll()
//     switchAll()
//   )
//   .subscribe((x) => console.log(x));

/**
 * 7.
 */

// const switched = of(1, 2, 3).pipe(switchMap((x) => of(x, x ** 2, x ** 3)));
// switched.subscribe((x) => console.log(x));

// new Observable((subscriber) => {
//   subscriber.next(1);
//   setTimeout(() => {
//     subscriber.next(3);
//     subscriber.next(4);
//   }, 6000);
//   subscriber.next(2);
// })
//   .pipe(
//     map((id) =>
//       interval(1000).pipe(
//         take(5),
//         map((seq) => `click ${id}: seq ${seq}`)
//       )
//     ),
//     exhaustAll()
//   )
//   .subscribe((x) => console.log(x));

/**
 * 8.
 */
// bindCallback((...args) => {
//   console.log('callback args', args);
// })(1, 2, 3).subscribe((x) => {
//   console.log(x);
// });

/**
 * 9.
 */
// const f = () => {
//   return 'superfree';
// };
// of(f())
//   .pipe(map((name) => `Hello ${name}`))
//   .subscribe((s) => {
//     console.log(s);
//   });

/**
 * 10.
 */
// of(2, 3, 4)
//   .pipe(startWith(1))
//   .subscribe((x) => console.log(x));
// EMPTY.pipe(startWith(1)).subscribe((x) => console.log(x));

/**
 * 11.
 */
// const api = (name: string) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const guess = Math.random();
//       if (guess > 0.5) {
//         resolve(`Get api result in 1000ms with name=${name}`);
//       } else {
//         reject(new Error('guess fail'));
//       }
//     }, 1000);
//   });

// // from(api()).subscribe((x) => console.log(x));
// const createTask = (name: string) => {
//   return from(api(name)).pipe(
//     catchError((err: Error, caught) => {
//       console.log('err', err, caught);
//       // caught.subscribe((x) => console.log(`caught value = ${x}`));
//       return of(err.message);
//     })
//   );
// };

// createTask('superfree').subscribe((res) => {
//   console.log(`res = ${res}`);
// });

/**
 * 12.
 */
// const subscription = interval(1000)
//   .pipe(
//     map((taskNo) =>
//       interval(1000).pipe(
//         take(4),
//         map((seq) => `task = ${taskNo}, seq = ${seq}`)
//       )
//     ),
//     switchAll(),
//     // mergeAll(),
//     // concatAll(),
//   )
//   .subscribe((x) => console.log(x));

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 10.5 * 1000);

let id = 0;
const subject = new Subject<void>();
subject
  .pipe(
    map(() =>
      from(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve((id = id + 1));
          }, 1000);
        })
      )
    ),
    // concatAll(),
    switchAll()
  )
  .subscribe((x) => console.log(x));

subject.next();
subject.next();
subject.next();
