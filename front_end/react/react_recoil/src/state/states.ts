import { atom, atomFamily } from 'recoil';

export const counterState = atom({
  key: 'counter',
  default: 0,
});

export const celsiusState = atom({
  key: 'celsius',
  default: 32,
});

export const businessCardDelayState = atom({
  key: 'businessCardDelay',
  default: 1000,
});

export const counterFamily = atomFamily({
  key: 'counterFamily',
  default: 0,
});

export const baseNumberState = atom({
  key: 'baseNumberState',
  default: 1,
});

export const randomNumberState = atom({
  key: 'randomNumberState',
  default: Math.random(),
});
