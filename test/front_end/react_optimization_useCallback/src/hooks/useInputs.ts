import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useState,
} from 'react';

const useInput = (): [
  string,
  ChangeEventHandler<HTMLInputElement>
] => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return [value, handleChange];
};

const useInputWithCallback = (): [
  string,
  ChangeEventHandler<HTMLInputElement>
] => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );

  return [value, handleChange];
};

export { useInput, useInputWithCallback };
