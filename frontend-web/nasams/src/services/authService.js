import axios from 'axios';

// Define API URL
const API_URL = 'http://localhost:8080/auth';

// Login API request
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('jwtToken', response.data);  // Store JWT Token
    return response.data;
  } catch (error) {
    console.error('Login Error: ', error);
    throw error;
  }
};

// Signup API request
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Signup Error: ', error);
    throw error;
  }
};
