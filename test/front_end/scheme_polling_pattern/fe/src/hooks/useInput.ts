import { ChangeEventHandler, useCallback, useState } from 'react';

const useInput = (initValue: string): [string, ChangeEventHandler<HTMLInputElement>] => {
  const [value, setValue] = useState(initValue);

  const onInputChnage: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onInputChnage];
};

export default useInput;
