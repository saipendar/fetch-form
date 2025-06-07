// src/api/auth.js
import axios from 'axios';

const BASE_URL = 'https://frontend-take-home.fetchrewards.com';

export const login = async (name, email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      { name, email },
      { withCredentials: true,git init
       headers: {
            'Content-Type': 'application/json'
          }
          }
    );
    return response.status === 200;
  } catch (err) {
    console.error('Login failed:', err);
    return false;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
    return true;
  } catch (err) {
    console.error('Logout failed:', err);
    return false;
  }
};
