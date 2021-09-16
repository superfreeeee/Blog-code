import { useRef, useCallback, useEffect } from 'react';

import { polling } from '@api';
import { wait } from '@utils';
import useUnMount from '@hooks/useUnMount';

const usePollingType1 = () => {
  const isPollingRef = useRef(false);
  const cancelRef = useRef(false);

  const cancelPolling = useCallback(() => {
    if (isPollingRef.current) {
      cancelRef.current = true;
    }
  }, []);

  const doPollingType1 = useCallback(async () => {
    if (isPollingRef.current) {
      console.log(`[doPollingType1] isPolling, return immediately`);
      return;
    }
    isPollingRef.current = true;

    const startPageNo = 1;
    const pageSize = 10;

    const pollNext = async (pageNo: number, pageSize: number) => {
      if (cancelRef.current) {
        console.log(`[doPollingType1] canceled`);
        cancelRef.current = false;
        isPollingRef.current = false;
        return;
      }
      console.log(`[doPollingType1] ${pageNo} ${pageSize}`);
      const { data, pagination } = await polling(pageNo, pageSize);
      const { hasFinish } = pagination;
      console.log(`[doPollingType1] recieve data`, data);

      if (!hasFinish) {
        const { pageNo, pageSize } = pagination;
        console.log(`[doPollingType1] ready to do next ${pageNo + 1} ${pageSize}`);
        await wait(1000);
        pollNext(pageNo + 1, pageSize);
      } else {
        isPollingRef.current = false;
      }
    };

    pollNext(startPageNo, pageSize);
  }, []);

  useUnMount(cancelPolling);

  return [doPollingType1, cancelPolling];
};

export default usePollingType1;
