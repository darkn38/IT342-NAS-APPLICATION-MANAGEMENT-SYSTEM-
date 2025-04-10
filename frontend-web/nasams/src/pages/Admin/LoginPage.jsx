// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigate('/welcome');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>NASAMS</h2>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--sanguine-brown)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem 3rem',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    minWidth: '300px'
  },
  header: {
    color: 'var(--sanguine-brown)',
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '1.5rem',
  },
  inputGroup: {
    marginBottom: '1rem',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    color: 'var(--sanguine-brown)',
    fontWeight: '600',
    marginBottom: '0.25rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#f1f1f1'
  },
  error: {
    color: 'red',
    marginBottom: '1rem'
  }
};

export default LoginPage;
