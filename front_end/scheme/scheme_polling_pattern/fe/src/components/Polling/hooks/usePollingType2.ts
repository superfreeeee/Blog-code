import { useCallback, useRef } from 'react';

import useUnMount from '@hooks/useUnMount';
import { polling } from '@api';

const usePollingType2 = () => {
  const isPollingRef = useRef(false);
  const cancelRef = useRef(false);

  const cancelPolling = useCallback(() => {
    if (isPollingRef.current) {
      cancelRef.current = true;
    }
  }, []);

  const doPollingType2 = useCallback(async () => {
    if (isPollingRef.current) {
      console.log(`[doPollingType2] isPolling, return immediately`);
      return;
    }
    isPollingRef.current = true;

    let currentPageNo = 1;
    const pageSize = 10;

    const doFinish = () => {
      clearInterval(timer);
      isPollingRef.current = false;
    };

    const timer = setInterval(() => {
      if (cancelRef.current) {
        console.log(`[doPollingType2] canceled`);
        doFinish();
        cancelRef.current = false;
        return;
      }
      console.log(`[doPollingType1] ${currentPageNo} ${pageSize}`);
      polling(currentPageNo, pageSize).then(({ data, pagination }) => {
        console.log(`[doPollingType2] recieve data`, data);

        const { pageNo, pageSize, hasFinish } = pagination;
        if (hasFinish) {
          doFinish();
        } else {
          console.log(`[doPollingType2] ready to do next ${pageNo + 1} ${pageSize}`);
          currentPageNo++;
        }
      });
    }, 1000);
  }, []);

  useUnMount(cancelPolling);

  return [doPollingType2, cancelPolling];
};

export default usePollingType2;
