import { randomBool } from '@utils/random';
import { EApiRoute } from './config';

export const mockData = {
  [EApiRoute.Hello]() {
    return 'Hello World';
  },
  [EApiRoute.Create]() {
    return {
      code: 200,
      id: 999,
    };
  },
  [EApiRoute.Error]() {
    return randomBool()
      ? {
          code: 200,
          msg: 'success',
        }
      : {
          code: 500,
          msg: 'fail',
        };
  },
};
