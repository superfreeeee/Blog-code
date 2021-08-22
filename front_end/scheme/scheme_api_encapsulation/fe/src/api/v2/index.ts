import axios from 'axios';

const host = 'http://localhost:3001';

/******************** 接口一 ********************/
export const helloREQ = () => {
  return axios.get<string>(`${host}/`);
};

/******************** 接口二 ********************/
export enum ECreateType {
  Increment = 'increment',
  Reset = 'reset',
}

interface ICreateREQRes {
  code: number;
  id: number;
}

export const createREQ = (type: ECreateType) => {
  return axios.post<ICreateREQRes>(`${host}/create`, { type });
};

/******************** 接口三 ********************/
export interface IErrorREQRes {
  code: number;
  msg: string;
}

export const errorREQ = (success: boolean) => {
  return axios.post<IErrorREQRes>(`${host}/error`, { success });
};
