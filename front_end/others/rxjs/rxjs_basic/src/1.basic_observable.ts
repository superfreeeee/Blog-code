import { Observable } from 'rxjs';
import { createTestWrapper } from './utils';

const testWrapper = createTestWrapper();
/**
 * 1. Normal function
 */
function f1() {
  return 1;
}

testWrapper(() => {
  console.log(f1());
});

/**
 * 2. Return multiple value
 */
function f2(res: any[]) {
  res.push(1);
  res.push(2);
  res.push(3);
}

testWrapper(() => {
  const res = [];
  f2(res);
  res.forEach((val) => {
    console.log(val);
  });
});

/**
 * 3. Basic Observable
 */
const observable = new Observable((subscriber) => {
  console.log('observable start');
  subscriber.next(4);
  subscriber.next(5);
  subscriber.next(6);

  console.log('observable complete');
  subscriber.complete();

  console.log('observable after complete');
  subscriber.next(7);
});

testWrapper(() => {
  observable.subscribe((val) => {
    console.log(val);
  });
});

/**
 * 4. Async Observable
 */
const observable2 = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next(8);
  });
});

testWrapper(() => {
  observable2.subscribe((val) => {
    console.log(val);
  });
});

const observable3 = new Observable((subscriber) => {
  Promise.resolve(9).then((res) => {
    subscriber.next(res);
  });
});

testWrapper(() => {
  observable3.subscribe((val) => {
    console.log(val);
  });
});
