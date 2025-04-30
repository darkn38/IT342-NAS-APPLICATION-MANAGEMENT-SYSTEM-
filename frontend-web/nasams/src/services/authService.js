// src/services/authService.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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