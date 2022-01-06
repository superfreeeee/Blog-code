import { useCallback, useState } from 'react';

const useForceUpdate = (): (() => void) => {
  const [, setState] = useState(null);

  const forceUpdate = useCallback(() => {
    setState({});
  }, []);

  return forceUpdate;
};

export default useForceUpdate;
