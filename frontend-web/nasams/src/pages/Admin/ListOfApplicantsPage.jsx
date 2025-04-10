// pages/ListOfApplicantsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaUserPlus } from 'react-icons/fa';

const ListOfApplicantsPage = () => {
  const navigate = useNavigate();
  const applicants = [
    { id: '19-0179-258', name: 'Ronan Paquera', email: 'cit.edu', dept: 'CCS', address: 'Cebu City' }
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>List of Applicant</h2>
          <button style={styles.closeBtn} onClick={() => navigate('/welcome')}>✕</button>
        </div>
        <div style={styles.buttonRow}>
          <button style={styles.addBtn} onClick={() => navigate('/add')}>
            <FaUserPlus style={{ marginRight: '8px' }} /> APPLICANT
          </button>
        </div>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>ID Number</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Change Password</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map(app => (
              <tr key={app.id}>
                <td style={styles.td}>{app.id}</td>
                <td style={styles.td}>{app.name}</td>
                <td style={styles.td}>{app.email}</td>
                <td style={styles.td}>{app.dept}</td>
                <td style={styles.td}>{app.address}</td>
                <td style={styles.td}>
                  <button style={styles.iconBtn}><FaEdit color="var(--acadia)" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
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
    padding: '2rem',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  heading: {
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
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1.5rem'
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
    boxShadow: '0 3px 6px rgba(0,0,0,0.2)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  thead: {
    backgroundColor: '#f0f0f0'
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: 'var(--acadia)',
    borderBottom: '2px solid #ddd'
  },
  td: {
    padding: '1rem',
    verticalAlign: 'top',
    borderBottom: '1px solid #eee'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default ListOfApplicantsPage;