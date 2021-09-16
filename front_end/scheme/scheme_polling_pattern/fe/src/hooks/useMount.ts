import { useEffect } from 'react';

const useMount = (fn: () => any) => {
  useEffect(fn, []);
};

export default useMount;
