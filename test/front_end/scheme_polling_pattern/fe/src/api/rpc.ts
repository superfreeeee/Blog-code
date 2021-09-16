const host = 'http://localhost:3001';

export const sendMsg = async <R, P = any>(path: string, method: 'GET' | 'POST', params?: P): Promise<R> => {
  try {
    const url = `${host}${path}`;
    const body = JSON.stringify(params);
    const headers = new Headers();
    headers.set('Content-type', 'application/json');

    const res = await fetch(url, { method, headers, body });
    return res.json();
  } catch (e) {
    console.error('[sendMsg] error occur', e);
    return {} as R;
  }
};
