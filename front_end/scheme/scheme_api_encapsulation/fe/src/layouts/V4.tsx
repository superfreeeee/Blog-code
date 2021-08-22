import React from 'react';

import Version from './Version';
import {
  helloREQ,
  createREQ,
  errorREQ,
  ECreateType,
  IErrorREQRes,
} from '@api/v4';
import { logGroup } from '@utils/message';
import { AxiosError } from 'axios';

const V4 = () => {
  const hello = () => {
    helloREQ().then((res) => {
      logGroup('[helloREQ] default', () => {
        console.log('res:', res);
      });
    });
  };

  const increment = () => {
    createREQ(ECreateType.Increment).then((res) => {
      logGroup('[createREQ] increment', () => {
        console.log('res:', res);
      });
    });
  };

  const reset = () => {
    createREQ(ECreateType.Reset).then((res) => {
      logGroup('[createREQ] reset', () => {
        console.log('res:', res);
      });
    });
  };

  const success = () => {
    errorREQ(true).then((res) => {
      logGroup('[errorREQ] success', () => {
        console.log('res:', res);
      });
    });
  };

  const fail = () => {
    errorREQ(false).then((res) => {
      logGroup('[errorREQ] fail', () => {
        console.log('res:', res);
      });
    });
  };

  return (
    <Version
      version={4}
      hello={hello}
      increment={increment}
      reset={reset}
      success={success}
      fail={fail}
    />
  );
};

export default V4;
