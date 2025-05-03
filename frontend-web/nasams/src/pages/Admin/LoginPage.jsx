import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/authService'; // Make sure the loginAdmin function is correctly defined

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const credentials = {
        email: username,
        password: password
      };
   
      const response = await loginAdmin(credentials);
   
      // ✅ Check if the user is really an admin
      if (response.role !== 'ADMIN') {
        setError('Access denied. Only Admins can log in.');
        return;
      }
   
      localStorage.setItem('jwtToken', response.token);
      navigate('/welcome');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Invalid email or password.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="/school-logo.png" alt="CIT-U Logo" style={styles.logo} />
        <h1 style={styles.title}>NASAMS</h1>
        <p style={styles.subtitle}>Non-Academic Scholar Application Management System</p>

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Email"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={styles.loginButton} onClick={handleLogin}>
          LOGIN
        </button>

        <div style={styles.footer}>
          &copy; 2025 Cebu Institute of Technology - University
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#F5F5DC',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem 3rem',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    textAlign: 'center',
    width: '400px',
    position: 'relative',
  },
  logo: {
    width: '120px',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#800000',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '16px',
    color: '#5D4037',
    marginBottom: '1.5rem',
  },
  inputGroup: {
    marginBottom: '1rem',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    fontSize: '14px',
  },
  loginButton: {
    backgroundColor: '#800000',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
  errorBox: {
    backgroundColor: '#ffe6e6',
    color: '#d32f2f',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    fontSize: '14px',
  },
  footer: {
    fontSize: '10px',
    color: '#999999',
    marginTop: '2rem',
  },
};

export default LoginPage;
