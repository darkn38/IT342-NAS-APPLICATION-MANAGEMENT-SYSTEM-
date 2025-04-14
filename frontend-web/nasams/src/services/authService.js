// src/services/authService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth';

export const loginAdmin = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Server Error');
    }
};