import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';  // Import the login function

const ApplicantLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await login({ username, password });
      if (token) {
        navigate('/applicant/dashboard');  // Redirect to dashboard on successful login
      }
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <img src="/school-logo.png" alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Applicant Login</h1>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.loginButton}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1D88A',
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: '60px',
    marginBottom: '1rem',
  },
  title: {
    color: '#8C363C',
    fontSize: '1.5rem',
  },
  inputGroup: {
    marginBottom: '1rem',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginTop: '0.5rem',
  },
  loginButton: {
    backgroundColor: '#8C363C',
    color: 'white',
    padding: '0.8rem',
    width: '100%',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default ApplicantLoginPage;
