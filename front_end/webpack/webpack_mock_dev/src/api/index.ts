import superagent from 'superagent';
import config from './config';

enum EApiMethod {
  GET = 'GET',
  POST = 'POST',
}

interface IRouteInfo {
  method: EApiMethod;
  path: string;
}

type IApiInfo = {
  [route in API_ROUTE]: IRouteInfo;
};

export enum API_ROUTE {
  TEST1 = 'test1',
  TEST2 = 'test2',
  TEST3 = 'test3',
}

/**
 * 服务端 API 注册表
 */
const API_INFO: IApiInfo = {
  [API_ROUTE.TEST1]: {
    method: EApiMethod.GET,
    path: '/test1',
  },
  [API_ROUTE.TEST2]: {
    method: EApiMethod.GET,
    path: '/test2',
  },
  [API_ROUTE.TEST3]: {
    method: EApiMethod.POST,
    path: '/test3',
  },
};

/**
 * GET 请求
 * @param route
 */
export function apiRequest(route: API_ROUTE): Promise<any>;

/**
 * POST 请求
 * @param route
 * @param body
 */
export function apiRequest(route: API_ROUTE, body: any): Promise<any>;

/**
 * apiRequest 实现
 * @param route
 * @param body
 */
export function apiRequest(route: API_ROUTE, body?: any): Promise<any> {
  const { method, path } = API_INFO[route];

  const useMock = config.mock.use;
  const host = useMock ? config.mock.host : config.host;

  /**
   * 本地 mock
   */
  if (useMock) {
    const mockUrl = `${host}${path}.json`;
    return superagent.get(mockUrl).send();
  }

  const url = `${host}${path}`;

  switch (method) {
    case EApiMethod.POST:
      return superagent.post(url).send(body);
    case EApiMethod.GET:
    default:
      return superagent.get(url).send();
  }
}
