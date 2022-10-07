export interface ICounterState {
  value: number;
}

export enum ECounterAction {
  Increment = 'counter/increment',
  Decrement = 'counter/decremenet',
}
