import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { retryToken } from './retryToke';
import { Config } from '../environment/config';

export const api = (): AxiosInstance => {
  const request = axios.create({
    baseURL: Config.baseApiUrl,
  });

  request.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;
      if (error.response?.status === 401) {
        if (await retryToken()) {
          const newRequest = axios.create({
            baseURL: 'http://localhost:5169',
          });
          return newRequest.request(originalRequest);
        } else {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

  return request;
};
