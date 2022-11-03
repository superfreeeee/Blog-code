import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { createUseSubjectStateHooks } from './hooks';

export const nameSubject = new BehaviorSubject<string>('crystal');

export const ageSubject = new BehaviorSubject<number>(15);

interface IIDCard {
  name: string;
  age: number;
}

export const idCardSubject: Observable<IIDCard> = combineLatest({
  name: nameSubject,
  age: ageSubject,
});

export const {
  useSubjectValue: useAgeValue,
  useSetSubjectState: useSetAgeStae,
  useSubjectState: useAgeState,
} = createUseSubjectStateHooks(ageSubject);

export const maxAgeSubject = ageSubject.pipe(
  map((age) => (age >= 18 ? 18 : age)),
);
