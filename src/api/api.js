// api.js

import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

 
