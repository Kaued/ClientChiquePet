import axios from 'axios';
import { api } from './axios';

export const retryToken = async () => {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  try {
    const request = api();
    const response = await request.post('/Admin/login', JSON.stringify({ email, password }), {
      headers: { 'Content-Type': 'application/json' },
    });

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
    return true;
  } catch (err) {
    return false;
  }
};
