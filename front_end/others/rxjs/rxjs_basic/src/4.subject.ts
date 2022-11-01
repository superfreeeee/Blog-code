import { BehaviorSubject, Subject } from 'rxjs';
import { createTestWrapper } from './utils';

const testWrapper = createTestWrapper();

/**
 * 1. Simple Subject
 */
// testWrapper(() => {
// const subject = new Subject();

// subject.subscribe(console.log);

// subject.next(1);
// subject.next(2);
// subject.next(3);

// subject.subscribe(console.log);
// });

/**
 * 2. Multiple subscribe
 */
// testWrapper(() => {
//   const subject = new Subject();

//   subject.subscribe((v) => {
//     console.log(`v1 = ${v}`);
//   });
//   subject.subscribe((v) => {
//     console.log(`v2 = ${v}`);
//   });

//   subject.next(1);
//   subject.next(2);
//   subject.next(3);
// });

/**
 * 3. BehaviorSubject
 */
const subject = new BehaviorSubject(0);

subject.subscribe(console.log);

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe(console.log);
