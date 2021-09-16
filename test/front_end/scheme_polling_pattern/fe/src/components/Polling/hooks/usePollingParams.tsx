import React, { useMemo } from 'react';

import useInput from '@hooks/useInput';

const usePollingParams = () => {
  const [pageNo, onPageNoChange] = useInput('1');
  const [pageSize, onPageSizeChange] = useInput('10');

  const ParamsEl = useMemo(
    () => (
      <div>
        <label>
          Page No: <input type="text" value={pageNo} onChange={onPageNoChange} />
        </label>
        <br />
        <label>
          Page Size: <input type="text" value={pageSize} onChange={onPageSizeChange} />
        </label>
      </div>
    ),
    [pageNo, pageSize]
  );

  return { pageNo: Number(pageNo), pageSize: Number(pageSize), ParamsEl };
};

export default usePollingParams;
