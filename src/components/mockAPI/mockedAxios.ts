import axios from 'axios';
import { type Place } from '../PlacesContext';

const mockedAxios = axios.create();

mockedAxios.interceptors.request.use(async (config) => {
  if (config.method === 'post' && config.url === '/api/place') {
    console.log('[MOCK] Intercepted POST /api/place');

    await new Promise((resolve) => setTimeout(resolve, 500));

    const formData: Place = typeof config.data === 'string'
      ? JSON.parse(config.data)
      : config.data;

    return {
      ...config,
      adapter: async () => {
        return {
          data: formData, // return exactly the same formData
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      },
    };
  }

  return config;
});

export default mockedAxios;
