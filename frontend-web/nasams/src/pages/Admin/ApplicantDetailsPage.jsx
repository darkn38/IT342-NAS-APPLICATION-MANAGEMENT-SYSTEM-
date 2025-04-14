// pages/ApplicantDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    address: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch applicant details from the backend using the id
  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Get JWT token from localStorage
        const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Send token for authentication
          }
        });
        setForm(response.data); // Populate form with applicant data
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to load applicant');
        setLoading(false);
      }
    };

    fetchApplicant(); // Fetch applicant details on component mount
  }, [id]);

  const handleClose = () => {
    navigate('/applicants'); // Navigate back to the applicants list
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsEditing(false);
      const token = localStorage.getItem('jwtToken');
      await axios.put(`http://localhost:8080/api/admin/users/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Changes saved successfully!');
    } catch (error) {
      setError(error.message || 'Failed to save changes');
    }
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
          <div>
            <div style={styles.formGrid}>
              {Object.entries(form).map(([key, value]) => (
                // Exclude the Id and Password fields from being rendered
                key !== 'idNumber' && key !== 'password' && (
                  <div
                    key={key}
                    style={{ ...styles.formGroup, ...(key === 'address' && { gridColumn: 'span 2' }) }}
                  >
                    <label style={styles.label}>{formatLabel(key)}</label>
                    <input
                      name={key}
                      value={value}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                )
              ))}
            </div>

            <div style={styles.docSection}>
              <h3 style={styles.subheading}>Uploaded Document</h3>
              <div style={styles.docBox}>PDF or Image Placeholder</div>
            </div>

            <div style={styles.actions}>
              <button style={styles.saveBtn} onClick={handleSave} disabled={!isEditing}>SAVE</button>
              <button style={styles.editBtn} onClick={() => setIsEditing(true)}>EDIT</button>
            </div>
          </div>
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
    backgroundColor: 'var(--sanguine-brown)',
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
    color: 'var(--acadia)',
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
    color: 'var(--acadia)'
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
    color: 'var(--sanguine-brown)'
  },
  input: {
    padding: '0.6rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f3f3f3'
  },
  docSection: {
    marginBottom: '2rem'
  },
  subheading: {
    color: 'var(--acadia)',
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
    backgroundColor: 'var(--sanguine-brown)',
    color: 'white',
    border: 'none',
    padding: '0.6rem 2rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  editBtn: {
    backgroundColor: 'white',
    color: 'var(--sanguine-brown)',
    border: '2px solid var(--sanguine-brown)',
    padding: '0.6rem 2rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default ApplicantDetailsPage;
