import React, { useEffect, useRef, useState } from 'react';

import Worker from '@workers/test3.worker.ts';

const useWorker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [count, setCount] = useState(0);

  const workerRef = useRef(null);

  useEffect(() => {
    const worker = new Worker();

    worker.onmessage = (e) => {
      const { currentTime, count } = e.data;
      setCurrentTime(currentTime);
      setCount(count);
    };

    workerRef.current = worker;
  }, []);

  const reset = () => {
    workerRef.current?.postMessage({ type: 'RESET' });
    setCount(0);
    console.log(workerRef.current);
  };

  const skip = () => {
    workerRef.current?.postMessage({ type: 'SKIP' });
    console.log(workerRef.current);
  };

  const terminate = () => {
    workerRef.current?.terminate();
    console.log(workerRef.current);
  };

  return [
    { currentTime, count },
    { reset, skip, terminate },
  ];
};

const Test3 = () => {
  const [{ currentTime, count }, { reset, skip, terminate }] = useWorker();

  return (
    <div>
      <h2>Test3 - Timer by Worker</h2>
      <h3>currentTime: {currentTime.toString()}</h3>
      <h3>count: {count}</h3>
      <button onClick={reset}>reset</button>
      <button onClick={skip}>skip</button>
      <button onClick={terminate}>terminate</button>
    </div>
  );
};

export default Test3;
