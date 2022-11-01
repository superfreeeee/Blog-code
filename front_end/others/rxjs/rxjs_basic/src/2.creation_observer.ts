import { from, of } from 'rxjs';
import { createTestWrapper } from './utils';

const testWrapper = createTestWrapper();

/**
 * 0. Creation
 */
testWrapper(() => {
  of(0, 1, 2).subscribe(console.log);
});

testWrapper(() => {
  from(Promise.resolve(3)).subscribe(console.log);
});

/**
 * 1. Simple Observer
 */
testWrapper(() => {
  of(1, 2, 3).subscribe((val) => {
    console.log(val);
  });
});

/**
 * 2. Explicit Observer
 */
testWrapper(() => {
  of(4, 5, 6).subscribe({
    next: (val) => {
      console.log(val);
    },
    complete: () => {
      console.log('complete');
    },
  });
});

/**
 * 3. Subscription
 */
testWrapper(() => {
  const subscription = of(7, 8, 9).subscribe(console.log);
  subscription.unsubscribe();

  const subscription2 = from(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(10);
      }, 1000);
    })
  ).subscribe(console.log);
  subscription2.unsubscribe();
});
