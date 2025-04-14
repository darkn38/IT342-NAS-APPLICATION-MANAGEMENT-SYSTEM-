// pages/Admin/ListOfApplicantsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';

const ListOfApplicantsPage = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Get the JWT token from local storage
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        });
        setApplicants(response.data); // Set applicants in state
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to load applicants');
        setLoading(false);
      }
    };

    fetchApplicants(); // Call the fetchApplicants function on component mount
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>List of Applicants</h2>
          <button style={styles.closeBtn} onClick={() => navigate('/welcome')}>✕</button>
        </div>
        <div style={styles.buttonRow}>
          <button style={styles.addBtn} onClick={() => navigate('/add')}>
            <FaUserPlus style={{ marginRight: '8px' }} /> Add Applicant
          </button>
        </div>

        {loading ? (
          <p style={styles.loadingText}>Loading applicants...</p>
        ) : error ? (
          <p style={styles.errorText}>{error}</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID Number</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Address</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((app) => (
                  <tr key={app.id} style={styles.tableRow}>
                    <td style={styles.td}>{app.idNumber}</td>
                    <td style={styles.td}>{app.firstName} {app.lastName}</td>
                    <td style={styles.td}>{app.email}</td>
                    <td style={styles.td}>{app.department}</td>
                    <td style={styles.td}>{app.address}</td>
                    <td style={styles.td}>
                      <button style={styles.iconBtn} onClick={() => navigate(`/applicants/${app.id}`)}>
                        <FaEdit color="green" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '2rem',
    backgroundColor: 'var(--sanguine-brown)',  // Ensure this matches your design
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '1200px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  heading: {
    color: 'var(--acadia)',  // Use your existing color
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  closeBtn: {
    fontSize: '1.5rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'var(--acadia)',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1.5rem',
  },
  addBtn: {
    backgroundColor: 'var(--buff)',
    color: 'var(--acadia)',
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  th: {
    backgroundColor: 'var(--sanguine-brown)',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '1rem',
    verticalAlign: 'middle',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    transition: 'background-color 0.3s ease',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '0.5rem',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  loadingText: {
    fontSize: '1.2rem',
    color: 'gray',
    textAlign: 'center',
  },
  errorText: {
    fontSize: '1.2rem',
    color: 'red',
    textAlign: 'center',
  },
};

export default ListOfApplicantsPage;
