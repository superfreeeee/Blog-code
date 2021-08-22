import React from 'react';

import Version from './Version';
import { EApiRoute, apiRequest } from '@api/v3';
import { logGroup } from '@utils/message';
import { AxiosError } from 'axios';
import { ECreateType, IErrorREQRes } from '@api/v2';

const V3 = () => {
  const hello = () => {
    apiRequest(EApiRoute.Hello).then((res) => {
      logGroup('[helloREQ] default', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const increment = () => {
    apiRequest(EApiRoute.Create, { type: ECreateType.Increment }).then(
      (res) => {
        logGroup('[createREQ] increment', () => {
          console.log('res:', res);
          console.log('data:', res.data);
        });
      }
    );
  };

  const reset = () => {
    apiRequest(EApiRoute.Create, { type: ECreateType.Reset }).then((res) => {
      logGroup('[createREQ] reset', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const success = () => {
    apiRequest(EApiRoute.Error, { success: true }).then((res) => {
      logGroup('[errorREQ] success', () => {
        console.log('res:', res);
        console.log('data:', res.data);
      });
    });
  };

  const fail = () => {
    apiRequest(EApiRoute.Error, { success: false }).catch(
      (err: AxiosError<IErrorREQRes>) => {
        logGroup('[errorREQ] fail', () => {
          console.log('err:', err);
          console.log('data:', err.response.data);
        });
      }
    );
  };

  return (
    <Version
      version={3}
      hello={hello}
      increment={increment}
      reset={reset}
      success={success}
      fail={fail}
    />
  );
};

export default V3;
