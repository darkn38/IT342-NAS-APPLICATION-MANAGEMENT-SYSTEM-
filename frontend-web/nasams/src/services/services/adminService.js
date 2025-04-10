import axios from 'axios';

const API_URL = 'http://localhost:8080/admins';  // Admin API URL

// Get all admins
export const getAdmins = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching admins: ', error);
    throw error;
  }
};

// Create a new admin
export const createAdmin = async (adminData) => {
  try {
    const response = await axios.post(API_URL, adminData);
    return response.data;
  } catch (error) {
    console.error('Error creating admin: ', error);
    throw error;
  }
};

// Get admin by ID
export const getAdminById = async (adminId) => {
  try {
    const response = await axios.get(`${API_URL}/${adminId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin by ID: ', error);
    throw error;
  }
};

// Update an admin
export const updateAdmin = async (adminId, updatedAdminData) => {
  try {
    const response = await axios.put(`${API_URL}/${adminId}`, updatedAdminData);
    return response.data;
  } catch (error) {
    console.error('Error updating admin: ', error);
    throw error;
  }
};

// Delete an admin
export const deleteAdmin = async (adminId) => {
  try {
    const response = await axios.delete(`${API_URL}/${adminId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting admin: ', error);
    throw error;
  }
};
