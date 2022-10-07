import { ChangeEvent, useCallback, useState } from 'react';

type IInputChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => void;

export const useInput = (
  initialValue: string = ''
): [
  string,
  IInputChangeEventHandler,
  { setInput: (value: string) => void }
] => {
  const [input, setInput] = useState(initialValue);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return [input, onInputChange, { setInput }];
};
