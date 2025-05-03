// src/pages/ApplicantDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ApplicantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    department: '',
    yearLevel: '',
    idNumber: '',
    email: '',
    address: '',
    status: '',
    remarks: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`${BASE_URL}/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm(response.data || {});
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to load applicant');
        setLoading(false);
      }
    };
  
    fetchApplicant();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.put(`${BASE_URL}/api/admin/users/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Changes saved successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.message || 'Failed to save changes');
    }
  };

  const handleClose = () => {
    navigate('/applicants');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <h2 style={styles.heading}>Applicant Details</h2>
            <p style={styles.subtext}>Profile ID: {id}</p>
          </div>
          <button style={styles.closeBtn} onClick={handleClose}>✕</button>
        </div>

        {loading ? (
          <p>Loading applicant details...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <div style={styles.formGrid}>
              {Object.entries(form).map(([key, value]) => (
                (key !== 'password') && (
                  <div
                    key={key}
                    style={{ ...styles.formGroup, ...(key === 'address' && { gridColumn: 'span 2' }) }}
                  >
                    <label style={styles.label}>{formatLabel(key)}</label>
                    {key === 'status' && isEditing ? (
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        style={styles.select}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : key === 'remarks' && isEditing ? (
                      <textarea
                        name="remarks"
                        value={form.remarks}
                        onChange={handleChange}
                        style={styles.textarea}
                      />
                    ) : (
                      <input
                        name={key}
                        value={value}
                        onChange={handleChange}
                        readOnly={!isEditing || (key !== 'remarks' && key !== 'status')}
                        style={styles.input}
                      />
                    )}
                  </div>
                )
              ))}
            </div>

            <div style={styles.docSection}>
              <h3 style={styles.subheading}>Uploaded Document</h3>
              <div style={styles.docBox}>PDF or Image Placeholder</div>
            </div>

            <div style={styles.actions}>
              {isEditing ? (
                <button style={styles.saveBtn} onClick={handleSave}>Save Changes</button>
              ) : (
                <button style={styles.editBtn} onClick={() => setIsEditing(true)}>Edit Profile</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

const styles = {
  wrapper: {
    padding: '2rem',
    backgroundColor: '#F5F5DC',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2.5rem 3rem',
    width: '95%',
    maxWidth: '1000px',
    boxShadow: '0 15px 25px rgba(0,0,0,0.2)'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  heading: {
    color: '#5D4037',
    fontSize: '2rem',
    marginBottom: '0.2rem'
  },
  subtext: {
    fontSize: '0.9rem',
    color: 'gray'
  },
  closeBtn: {
    fontSize: '1.2rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#5D4037'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.4rem',
    color: '#5D4037'
  },
  input: {
    padding: '0.6rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f3f3f3'
  },
  select: {
    padding: '0.6rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#fff'
  },
  textarea: {
    padding: '0.6rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    height: '100px',
    backgroundColor: '#fff'
  },
  docSection: {
    marginBottom: '2rem'
  },
  subheading: {
    color: '#5D4037',
    fontSize: '1.2rem',
    marginBottom: '0.8rem'
  },
  docBox: {
    height: '200px',
    backgroundColor: '#f0f0f0',
    border: '2px dashed #ccc',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    fontStyle: 'italic'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem'
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  editBtn: {
    backgroundColor: 'white',
    color: '#4CAF50',
    border: '2px solid #4CAF50',
    padding: '0.8rem 2rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default ApplicantDetailsPage;