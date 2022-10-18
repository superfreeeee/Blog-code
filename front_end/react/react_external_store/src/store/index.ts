import { useEffect, useState, useSyncExternalStore } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { createSimpleStore, ExternalStore } from './store';

export const simpleStore = createSimpleStore(0);

export const useCustomStore = () => {
  const [state, setState] = useState(simpleStore.getState());

  useEffect(() => {
    const unsubscribe = simpleStore.subscribe(() => {
      setState(simpleStore.getState());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
};

export const useSimpleStore = () => {
  return useSyncExternalStore(simpleStore.subscribe, simpleStore.getState);
};

export const complexStore = createSimpleStore({
  name: 'superfree',
  grade: 100,
});

export const useComplexStore = () => {
  return useSyncExternalStore(complexStore.subscribe, complexStore.getState);
};

type ComplexState = ReturnType<typeof complexStore.getState>;

export const useComplexStoreSelector = <T>(
  selector: (snapshot: ComplexState) => T
) => {
  return useSyncExternalStoreWithSelector(
    complexStore.subscribe,
    complexStore.getState,
    complexStore.getState,
    selector
  );
};

export const createCustomStoreSelector =
  <T, S>(store: ExternalStore<T>) =>
  (selector: (snapshot: T) => S) => {
    return useSyncExternalStoreWithSelector(
      store.subscribe,
      store.getState,
      store.getState,
      selector
    );
  };
