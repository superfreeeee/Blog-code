import { useEffect } from 'react';

const useUnMount = (fn: () => any) => {
  useEffect(() => fn, []);
};

export default useUnMount;
