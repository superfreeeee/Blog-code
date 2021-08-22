import axios from 'axios';

export enum EHttpMethod {
  GET = 'GET',
  POST = 'POST',
}

/**
 * http 请求，基于 axios
 * @param {R} 返回类型
 * @param {B} 返回参数类型
 * @param url
 * @param method
 * @param body
 * @returns
 */
export const httpRequest = async <R, B>(
  url: string,
  method: EHttpMethod,
  body?: B
): Promise<R> => {
  switch (method) {
    // Http POST 请求
    case EHttpMethod.POST:
      try {
        const res = await axios.post<R>(url, body);
        return res.data;
      } catch (err) {
        return err.response.data;
      }

    // Http GET 请求
    case EHttpMethod.GET:
    default:
      try {
        const res = await axios.get<R>(url);
        return res.data;
      } catch (err) {
        return err.response.data;
      }
  }
};
