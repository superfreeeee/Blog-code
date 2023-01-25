import { proxy, useSnapshot } from 'valtio';

interface ISimpleStore {
  name: string;
  deep: {
    level1?: boolean;
    inside: {
      level2: number;
    };
  };
}

const initStore: ISimpleStore = {
  name: 'superfree',
  deep: {
    // level1: false,
    inside: {
      level2: 7,
    },
  },
};

export const store = proxy(initStore);

export const useStore = () => useSnapshot(store);

export const actions = {
  setName: (name: string) => {
    store.name = name;
  },
  toggleLevel1: () => {
    const prevLevel1 = store.deep.level1 || false;
    store.deep.level1 = !prevLevel1;
  },
  inc: () => {
    store.deep.inside.level2++;
  },
  reset: () => {
    store.deep.inside.level2 = 0;
  },
};
