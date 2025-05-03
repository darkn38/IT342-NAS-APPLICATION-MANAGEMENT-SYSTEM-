// src/services/applicantService.js
import axios from 'axios';

// ✅ Use fallback if env fails
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://nasams-production.up.railway.app';
console.log('🔥 BASE_URL:', BASE_URL);  // DevTools log to confirm which URL is used

const API_URL = `${BASE_URL}/api/admin/users`;

// ✅ Get auth header with JWT token
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
});

// ✅ Get all applicants
export const getApplicants = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeader() });
  return response.data;
};

// ✅ Get single applicant by ID
export const getApplicantById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// ✅ Update applicant status and remarks
export const updateApplicantStatus = async (id, status, remarks) => {
  await axios.patch(`${API_URL}/${id}/status`, null, {
    params: { status, remarks },
    headers: getAuthHeader()
  });
};

// ✅ Delete applicant
export const deleteApplicant = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};