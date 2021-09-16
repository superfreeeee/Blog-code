import React, { useCallback, useMemo, useRef } from 'react';

import { polling } from '@api';
import usePollingParams from './hooks/usePollingParams';
import usePollingType1 from './hooks/usePollingType1';
import usePollingType2 from './hooks/usePollingType2';
import usePollingType3 from './hooks/usePollingType3';

const Polling = () => {
  const { pageNo, pageSize, ParamsEl } = usePollingParams();

  const doPolling = useCallback(async () => {
    const res = await polling(pageNo, pageSize);
    console.log('[doPolling] res', res);
  }, [pageNo, pageSize]);

  const [doPollingType1, cancelPollingType1] = usePollingType1();
  const [doPollingType2, cancelPollingType2] = usePollingType2();
  const [doPollingType3, cancelPollingType3] = usePollingType3();

  return (
    <div>
      <h3>Polling 测试</h3>
      {ParamsEl}
      <button onClick={doPolling}>polling</button>
      <div>
        <button onClick={doPollingType1}>polling type 1</button>
        <button onClick={cancelPollingType1}>polling type 1 cancel</button>
      </div>
      <div>
        <button onClick={doPollingType2}>polling type 2</button>
        <button onClick={cancelPollingType2}>polling type 2 cancel</button>
      </div>
      <div>
        <button onClick={doPollingType3}>polling type 3</button>
        <button onClick={cancelPollingType3}>polling type 3 cancel</button>
      </div>
    </div>
  );
};

export default Polling;
