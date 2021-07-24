import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useState,
} from 'react';

/**
 * 基本用法
 * @returns
 */
const useInput = (): [
  string,
  ChangeEventHandler<HTMLInputElement>
] => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return [value, handleChange];
};

/**
 * 带 useCallback 用法
 * @returns
 */
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
