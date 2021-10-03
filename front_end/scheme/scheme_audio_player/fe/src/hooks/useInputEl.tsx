import React, { ChangeEvent, ReactElement, useCallback, useMemo, useRef, useState } from 'react';

const useInputEl = (initValue: string): [string, ReactElement] => {
  const [value, setValue] = useState(initValue);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, useMemo(() => <input type="text" value={value} onChange={onInputChange} />, [value, onInputChange])];
};

export default useInputEl;
