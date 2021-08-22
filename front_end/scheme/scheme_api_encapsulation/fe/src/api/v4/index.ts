import { apiConfigs, EApiRoute } from './config';
import { httpRequest } from './http';
import { mockData } from './mock';

const host = 'http://localhost:3001';

/******************** 接口一 ********************/
export const helloREQ = () => {
  return apiRequest<string>(EApiRoute.Hello);
};

/******************** 接口二 ********************/
export enum ECreateType {
  Increment = 'increment',
  Reset = 'reset',
}

interface ICreateREQBody {
  type: ECreateType;
}

interface ICreateREQRes {
  code: number;
  id: number;
}

export const createREQ = (type: ECreateType) => {
  return apiRequest<ICreateREQRes, ICreateREQBody>(EApiRoute.Create, { type });
};

/******************** 接口三 ********************/
interface IErrorREQBody {
  success: boolean;
}

export interface IErrorREQRes {
  code: number;
  msg: string;
}

export const errorREQ = (success: boolean) => {
  return apiRequest<ICreateREQRes, IErrorREQBody>(EApiRoute.Error, {
    success,
  });
};

/******************** 接口统一入口 ********************/
async function apiRequest<R, B = {}>(route: EApiRoute, body?: B): Promise<R> {
  const { method, path, mock } = apiConfigs[route];

  if (mock) {
    const res = mockData[route]() as any;
    return res;
  }

  const url = `${host}${path}`;

  return httpRequest<R, B>(url, method, body);
}
