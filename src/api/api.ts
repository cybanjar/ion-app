import axios, { AxiosRequestConfig } from 'axios'
import { hadistLocal } from '@/api/config'

export interface Parameter {
  [key: string]: any
}

export default {
  doFetch: async (url: string, params?: AxiosRequestConfig) => {
    const requestURL = hadistLocal + url;

    try {
      const response = await axios.get(requestURL, params);
      
      const data = await response.data;
      return data;
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },
}