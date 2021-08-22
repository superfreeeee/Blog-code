import React from 'react';

import Version from './Version';
import { helloREQ, createREQ, errorREQ } from '@api/v1';
import { logGroup } from '@utils/message';

const V1 = () => {
  const hello = () => {
    helloREQ().then((res) => {
      logGroup('[helloREQ] default', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const increment = () => {
    createREQ('increment').then((res) => {
      logGroup('[createREQ] increment', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const reset = () => {
    createREQ('reset').then((res) => {
      logGroup('[createREQ] reset', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const success = () => {
    errorREQ(true).then((res) => {
      logGroup('[errorREQ] success', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const fail = () => {
    errorREQ(false).catch((err) => {
      logGroup('[errorREQ] fail', () => {
        console.log('err:', err);
        console.log('data:', err.response.data);
      });
    });
  };

  return (
    <Version
      version={1}
      hello={hello}
      increment={increment}
      reset={reset}
      success={success}
      fail={fail}
    />
  );
};

export default V1;
