import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ListOfApplicantsPage = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`${BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });        
        
        // Filter out Admin users (Only Applicants will be shown)
        const filteredApplicants = response.data.filter(user => user.role !== 'ADMIN');
        setApplicants(filteredApplicants);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to load applicants');
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>List of Applicants</h2>
          <div style={styles.headerActions}>
            <button style={styles.addBtn} onClick={() => navigate('/add')}>
              <FaUserPlus style={{ marginRight: '8px' }} /> Add Applicant
            </button>
            <button style={styles.closeBtn} onClick={() => navigate('/welcome')}>
              ✕
            </button>
          </div>
        </div>

        {loading ? (
          <p style={styles.message}>Loading applicants...</p>
        ) : error ? (
          <p style={{ ...styles.message, color: 'red' }}>{error}</p>
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
                  <tr key={app.id} style={styles.tr}>
                    <td style={styles.td}>{app.idNumber || '—'}</td>
                    <td style={styles.td}>{(app.firstName || '') + ' ' + (app.lastName || '')}</td>
                    <td style={styles.td}>{app.email || '—'}</td>
                    <td style={styles.td}>{app.department || '—'}</td>
                    <td style={styles.td}>{app.address || '—'}</td>
                    <td style={styles.td}>
                      <button style={styles.iconBtn} onClick={() => navigate(`/applicants/${app.id}`)}>
                        <FaEdit />
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
  page: {
    backgroundColor: '#F5F5DC',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    width: '100%',
    maxWidth: '1200px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#5D4037',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  addBtn: {
    backgroundColor: '#800000',
    color: 'white',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '14px',
  },
  closeBtn: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#800000',
    color: 'white',
    padding: '1rem',
    fontSize: '14px',
    textAlign: 'left',
  },
  tr: {
    borderBottom: '1px solid #f0f0f0',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '1rem',
    fontSize: '14px',
    color: '#5D4037',
  },
  iconBtn: {
    backgroundColor: '#E0F2F1',
    border: 'none',
    padding: '0.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  },
  message: {
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '2rem',
  },
};

export default ListOfApplicantsPage;