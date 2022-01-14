import { selector, selectorFamily } from 'recoil';
import {
  baseNumberState,
  businessCardDelayState,
  celsiusState,
} from './states';
import { BusinessCard } from './type';

export const fahrenheitState = selector<number>({
  key: 'fahrenheit',
  get: ({ get }) => (get(celsiusState) * 9) / 5 + 32,
  set: ({ set }, newValue: number) =>
    set(celsiusState, ((newValue - 32) * 5) / 9),
});

export const businessCardState = selector<BusinessCard>({
  key: 'businessCard',
  get: async ({ get }) => {
    const minDelay = get(businessCardDelayState);
    const [res] = await Promise.all([
      fetch('/businessCard.json'),
      new Promise((resolve) => setTimeout(resolve, minDelay)),
    ]);
    return res.json();
  },
});

export const multipliedNumberFamily = selectorFamily<number, number>({
  key: 'multipliedNumber',
  get:
    (multiplier: number) =>
    ({ get }) =>
      get(baseNumberState) * multiplier,
  set:
    (multiplier: number) =>
    ({ set }, newValue: number) =>
      set(baseNumberState, newValue / multiplier),
});
