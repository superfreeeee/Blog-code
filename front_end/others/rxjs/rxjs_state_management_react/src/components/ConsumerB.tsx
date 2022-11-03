import React from 'react';
import { useSubjectValue } from '../store/hooks';
import {
  idCardSubject,
  maxAgeSubject,
  useAgeValue,
  useSetAgeStae,
} from '../store/state';

const ConsumerB = () => {
  console.log('render ConsumerB');

  // const age = useSubjectValue(ageSubject, 0);
  // const setAge = useSetSubjectState(ageSubject);

  const age = useAgeValue(0);
  const setAge = useSetAgeStae();

  const idCard = useSubjectValue(idCardSubject, { name: '', age: 0 });

  const maxAge = useSubjectValue(maxAgeSubject, 0);

  return (
    <div>
      <div>age: {age}</div>
      <button onClick={() => setAge(age + 1)}>Happy Birthday !</button>
      <div>idCard: {JSON.stringify(idCard)}</div>
      <div>max age: {maxAge}</div>
    </div>
  );
};

export default ConsumerB;
