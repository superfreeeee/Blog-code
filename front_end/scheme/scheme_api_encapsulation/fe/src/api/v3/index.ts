import axios from 'axios';

const host = 'http://localhost:3001';

enum EHttpMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum EApiRoute {
  Hello,
  Create,
  Error,
}

interface IApiConfigInfo {
  method: EHttpMethod;
  path: string;
  mock: boolean;
}

type ApiConfigRoute = {
  [key in EApiRoute]: IApiConfigInfo;
};

const apiConfigs: ApiConfigRoute = {
  [EApiRoute.Hello]: {
    method: EHttpMethod.GET,
    path: '/',
    mock: false,
  },
  [EApiRoute.Create]: {
    method: EHttpMethod.POST,
    path: '/create',
    mock: false,
  },
  [EApiRoute.Error]: {
    method: EHttpMethod.POST,
    path: '/error',
    mock: false,
  },
};

export function apiRequest(route: EApiRoute, data?: any): Promise<any> {
  const { method, path, mock } = apiConfigs[route];

  if (mock) {
    console.log('mock');
  }

  const url = `${host}${path}`;
  switch (method) {
    case EHttpMethod.POST:
      return axios.post(url, data);
    case EHttpMethod.GET:
    default:
      return axios.get(url);
  }
}
