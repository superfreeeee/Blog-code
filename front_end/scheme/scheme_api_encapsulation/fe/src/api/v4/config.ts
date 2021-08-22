import { EHttpMethod } from './http';

interface IApiConfigInfo {
  method: EHttpMethod;
  path: string;
  mock: boolean;
}

type ApiConfigRoute = {
  [key in EApiRoute]: IApiConfigInfo;
};

export enum EApiRoute {
  Hello,
  Create,
  Error,
}

/**
 * 接口配置信息
 */
export const apiConfigs: ApiConfigRoute = {
  [EApiRoute.Hello]: {
    method: EHttpMethod.GET,
    path: '/',
    mock: false,
  },
  [EApiRoute.Create]: {
    method: EHttpMethod.POST,
    path: '/create',
    mock: true,
  },
  [EApiRoute.Error]: {
    method: EHttpMethod.POST,
    path: '/error',
    mock: false,
  },
  //
};
