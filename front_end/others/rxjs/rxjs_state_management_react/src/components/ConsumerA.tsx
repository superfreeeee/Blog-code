import React from 'react';
import { useSubjectState } from '../store/hooks';
import { nameSubject } from '../store/state';

const ConsumerA = () => {
  const [name, setName] = useSubjectState(nameSubject, '');

  return (
    <div>
      <div>name: {name}</div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default ConsumerA;
