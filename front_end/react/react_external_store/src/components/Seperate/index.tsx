import React, { useEffect } from 'react';
import {
  complexStore,
  simpleStore,
  useComplexStore,
  useComplexStoreSelector,
  useCustomStore,
  useSimpleStore,
} from '../../store';

const CompA = () => {
  const num = useSimpleStore();
  // const num = useCustomStore();
  const me = useComplexStore();

  useEffect(() => {
    console.log(`rerender A = ${num}`, me);
  });

  const inc = () => {
    simpleStore.dispatch((prev) => prev + 1);
  };

  return (
    <div>
      <h3>A</h3>
      <button onClick={inc}>inc</button>
      <div>name: {me.name}</div>
    </div>
  );
};

const CompB = () => {
  const num = useSimpleStore();
  const me = useComplexStore();

  useEffect(() => {
    console.log(`rerender B = ${num}`, me);
  });

  const onNameChange = (e: any) => {
    complexStore.dispatch({ ...me, name: e.target.value });
  };

  return (
    <div>
      <h3>B</h3>
      <div>num: {num}</div>
      <input type="text" value={me.name} onChange={onNameChange} />
    </div>
  );
};

const CompC = () => {
  const grade = useComplexStoreSelector((state) => state.grade);
  // const { grade } = useComplexStore();

  useEffect(() => {
    console.log(`rerender C = ${grade}`);
  });

  return (
    <div>
      <h3>C</h3>
      <div>grade: {grade}</div>
    </div>
  );
};

const Seperate = () => {
  return (
    <div>
      <h2>Seperate</h2>
      <CompA />
      <CompB />
      <CompC />
    </div>
  );
};

export default Seperate;
