// import './test';

import { delay, of, Subject, switchMap } from 'rxjs';
import { switchMapBy } from './operators/switchMapBy';

interface IData {
  id: number;
  seq: number;
  delay?: number;
}

const subject = new Subject<IData>();

subject
  .pipe(
    // switchMap((obj) => of(obj)),
    // switchMap((obj) => of(obj).pipe(delay(obj.delay || 0))),
    switchMapBy('id', (obj) => of(obj).pipe(delay(obj.delay || 0))),
    // switchMapBy(
    //   (obj) => obj.id,
    //   (obj) => of(obj).pipe(delay(obj.delay || 0)),
    // ),
    // switchMapBy(
    //   (obj1, obj2) => obj1.id === obj2.id,
    //   (obj) => of(obj).pipe(delay(obj.delay || 0)),
    // ),
  )
  .subscribe((obj) => {
    const now = Math.floor(performance.now());
    console.log(`[time: ${now}]`, obj);
  });

subject.next({ id: 1, seq: 1 });
subject.next({ id: 2, seq: 2 });
subject.next({ id: 3, seq: 3 });
subject.next({ id: 1, seq: 4 });
subject.next({ id: 2, seq: 5, delay: 3000 });
subject.next({ id: 2, seq: 6, delay: 2000 });
