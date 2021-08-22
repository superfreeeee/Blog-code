import React from 'react';

import Version from './Version';
import {
  helloREQ,
  createREQ,
  errorREQ,
  ECreateType,
  IErrorREQRes,
} from '@api/v2';
import { logGroup } from '@utils/message';
import { AxiosError } from 'axios';

const V2 = () => {
  const hello = () => {
    helloREQ().then((res) => {
      logGroup('[helloREQ] default', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const increment = () => {
    createREQ(ECreateType.Increment).then((res) => {
      logGroup('[createREQ] increment', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const reset = () => {
    createREQ(ECreateType.Reset).then((res) => {
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
    errorREQ(false).catch((err: AxiosError<IErrorREQRes>) => {
      logGroup('[errorREQ] fail', () => {
        console.log('err:', err);
        console.log('data:', err.response.data);
      });
    });
  };

  return (
    <Version
      version={2}
      hello={hello}
      increment={increment}
      reset={reset}
      success={success}
      fail={fail}
    />
  );
};

export default V2;
