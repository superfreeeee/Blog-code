import React, { FC } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';

import styles from './App.module.scss';

const ageAtom = atom(22);
const nameAtom = atom('superfree');
const idAtom = atom((get) => `${get(nameAtom)}-${get(ageAtom)}`);

const Inner = () => {
  const [name] = useAtom(nameAtom);
  console.log('name:', name, `, name: ${name}, name:`, name.toString());
  return <h1>name: {name}</h1>;
};

const InnerId = () => {
  const id = useAtomValue(idAtom);
  return <h1>id: {id}</h1>;
};

const App: FC = () => {
  const [age, setAge] = useAtom(ageAtom);
  const [name, setName] = useAtom(nameAtom);

  return (
    <div className={styles.container}>
      <h1>React App</h1>
      <div>Project build by @youxian/cli</div>
      <div>age: {age}</div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Inner />
      <InnerId />
    </div>
  );
};

export default App;
