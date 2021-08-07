import React, { useEffect } from 'react';

const useWindowResize = (fn, deps: React.DependencyList = []) => {
  useEffect(() => {
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };
  }, deps);
};

export default useWindowResize;
