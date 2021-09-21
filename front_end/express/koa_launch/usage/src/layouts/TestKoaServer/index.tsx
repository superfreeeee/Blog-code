import { useMount } from '@youxian/utils';
import React, { useState } from 'react';

const TestKoaServer = () => {
  useMount(() => {
    console.log('TestKoaServer mount');
  });

  const [path, setPath] = useState('');
  const [result, setResult] = useState('');
  const [records, setRecords] = useState([]);

  const onPathChange = (e) => {
    setPath(e.target.value);
  };

  const request = () => {
    fetch(`http://localhost:3001${path}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);
        setResult(JSON.stringify(res));
      })
      .catch((e) => {
        console.error('error occur');
        console.error(e);
      });
  };

  const getLogAll = () => {
    fetch(`http://localhost:3001/logger/all`)
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);
        setRecords(res);
      });
  };

  const addNewLog = () => {
    fetch(`http://localhost:3001/logger/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app: 'TEST_KOA', env: 'pre' }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);
      });
  };

  return (
    <div>
      <h1>TestKoaServer</h1>
      <div>
        <input type="text" value={path} onChange={onPathChange} />
        <button onClick={request}>request</button>
        <div>result: {result}</div>
      </div>
      <div>
        <button onClick={getLogAll}>/log/all</button>
        <button onClick={addNewLog}>/log/add</button>
        <div style={{ height: '400px', overflow: 'scroll' }}>
          records:{' '}
          {records.map((record) => (
            <div>{JSON.stringify(record)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestKoaServer;
