import axios from 'axios'

const baseURL = 'http://jsonplaceholder.typicode.com'

export default {
  doFetch: async (url:any) => {
    const requestURL = baseURL + url;

    try {
      const response = await axios.get(requestURL);
      
      const data = await response.data;
      return data;
    } catch (error:any) {
      return { errorMessage: error.message };
    }
  },
}