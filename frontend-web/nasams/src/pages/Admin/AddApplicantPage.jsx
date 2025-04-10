// pages/AddApplicantPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddApplicantPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', dept: '', yearLevel: '', idNumber: '', email: '', address: '', username: '', password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Applicant added successfully!');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Add Applicant</h2>
          <button style={styles.closeBtn} onClick={() => navigate('/list')}>✕</button>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          {Object.entries(form).map(([key, value]) => (
            <div key={key} style={styles.formGroup}>
              <label style={styles.label}>{formatLabel(key)}</label>
              <input
                type={key === 'password' ? 'password' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          ))}
          <div style={styles.actions}>
            <button type="submit" style={styles.saveBtn}>SAVE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const styles = {
  wrapper: {
    padding: '2rem',
    backgroundColor: 'var(--sanguine-brown)',
    minHeight: '100vh'
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem 3rem',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  heading: {
    margin: 0,
    color: 'var(--acadia)',
    fontSize: '1.8rem'
  },
  closeBtn: {
    fontSize: '1.2rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'var(--acadia)'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    color: 'var(--sanguine-brown)',
    fontWeight: '600'
  },
  input: {
    padding: '0.5rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f3f3f3'
  },
  actions: {
    gridColumn: 'span 2',
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center'
  },
  saveBtn: {
    backgroundColor: 'var(--sanguine-brown)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 2rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default AddApplicantPage;
