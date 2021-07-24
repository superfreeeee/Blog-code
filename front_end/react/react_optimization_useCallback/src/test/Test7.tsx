import React, { useState } from 'react';
import { rec } from '../utils/record';

const Test7 = () => {
  console.group('render Test7')
  
  const [state, setState] = useState(0);

  rec('Test7', setState);

  console.groupEnd()
  return (
    <div>
      <h2>Test 7: 测试 setState</h2>
      <h3>count: {state}</h3>
      <button onClick={() => setState(state + 1)}>Increment</button>
    </div>
  );
};

export default Test7;
