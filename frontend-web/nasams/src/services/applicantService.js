// src/services/applicantService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/users';

// ✅ Helper function to get token
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // <-- fixed here
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
