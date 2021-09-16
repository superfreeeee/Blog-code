import { IPollingResponse, IPollingParams, IGreetingResponse } from './interface';
import { sendMsg } from './rpc';

/**
 * 测试用接口
 * @returns
 */
export const greeting = (): Promise<IGreetingResponse> => {
  return sendMsg<IGreetingResponse>('/greeting', 'GET');
};

/**
 * 轮询接口
 * @param pageNo
 * @param pageSize
 * @returns
 */
export const polling = (pageNo: number, pageSize: number): Promise<IPollingResponse> => {
  return sendMsg<IPollingResponse, IPollingParams>('/polling', 'POST', {
    pageNo,
    pageSize,
  });
};
