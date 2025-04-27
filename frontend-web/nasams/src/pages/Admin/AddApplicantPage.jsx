// src/pages/Admin/AddApplicantPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddApplicantPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    department: '',
    yearLevel: '',
    idNumber: '',
    email: '',
    address: '',
    password: '',
    role: 'APPLICANT',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post('http://localhost:8080/api/admin/users', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Applicant added successfully!');
        navigate('/list');
      }
    } catch (error) {
      setError('Failed to add applicant. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <h2 style={styles.pageTitle}>Add Applicant</h2>
          <button onClick={() => navigate('/list')} style={styles.closeBtn}>✕</button>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* First Name */}
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Last Name */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Department */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Computer Studies">Computer Studies</option>
              {/* Add more departments if needed */}
            </select>
          </div>

          {/* Year Level */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Year Level</label>
            <select
              name="yearLevel"
              value={form.yearLevel}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* ID Number */}
          <div style={styles.formGroup}>
            <label style={styles.label}>ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Address */}
          <div style={styles.fullWidthGroup}>
            <label style={styles.label}>Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              style={styles.textarea}
              required
            ></textarea>
          </div>

          {/* Password */}
          <div style={styles.fullWidthGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Buttons */}
          <div style={styles.buttonsRow}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate('/list')}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.saveButton}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#F5F5DC',
    minHeight: '100vh',
    padding: '2rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  pageTitle: {
    fontSize: '24px',
    color: '#5D4037',
    fontWeight: 'bold',
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#800000',
    cursor: 'pointer',
  },
  errorText: {
    color: 'red',
    marginBottom: '1rem',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  fullWidthGroup: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: 'span 2',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#5D4037',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    fontSize: '14px',
  },
  textarea: {
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    height: '100px',
    fontSize: '14px',
  },
  buttonsRow: {
    gridColumn: 'span 2',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  cancelButton: {
    backgroundColor: 'white',
    border: '2px solid #800000',
    color: '#800000',
    padding: '0.6rem 2rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#800000',
    color: 'white',
    border: 'none',
    padding: '0.6rem 2rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default AddApplicantPage;
