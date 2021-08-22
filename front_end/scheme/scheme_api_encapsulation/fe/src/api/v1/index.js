import axios from 'axios';

const host = 'http://localhost:3001';

export const helloREQ = () => {
  return axios.get(`${host}/`);
};

export const createREQ = (type) => {
  if (type !== 'increment' && type !== 'reset') {
    return Promise.reject(new Error(`unacceptable type: ${type}`));
  }
  return axios.post(`${host}/create`, { type });
};

export const errorREQ = (success) => {
  success = !!success;
  return axios.post(`${host}/error`, { success });
};
