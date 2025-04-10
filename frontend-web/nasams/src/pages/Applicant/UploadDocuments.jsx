// src/pages/Applicant/UploadDocuments.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadDocuments = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({});

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Documents uploaded successfully!');
    navigate('/applicant/dashboard');
  };

  return (
    <div style={styles.container}>
      <h2>Upload Documents</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Upload ITR:</label>
        <input type="file" name="itr" onChange={handleFileChange} style={styles.input} />

        <label>Upload Good Moral:</label>
        <input type="file" name="goodMoral" onChange={handleFileChange} style={styles.input} />

        <label>Upload Grades:</label>
        <input type="file" name="grades" onChange={handleFileChange} style={styles.input} />

        <button type="submit" style={styles.button}>Submit Documents</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'var(--buff)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'left',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  input: {
    display: 'block',
    marginBottom: '1rem',
    marginTop: '0.5rem'
  },
  button: {
    backgroundColor: 'var(--sanguine-brown)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%'
  }
};

export default UploadDocuments;
