import React from 'react';
import Test1 from './test/Test1';
import Test2 from './test/Test2';
import Test3 from './test/Test3';
import Test4 from './test/Test4';
import Test5 from './test/Test5';
import Test6 from './test/Test6';
import Test7 from './test/Test7';
import Test8 from './test/Test8';

export default function App() {
  console.log('render App');

  return (
    <div>
      <h1>React 优化 - useCallback</h1>
      <Test1 />
      <Test2 />
      <Test3 />
      <Test4 />
      <Test5 />
      <Test6 />
      {/* <Test7 /> */}
      <Test8 />
    </div>
  );
}
