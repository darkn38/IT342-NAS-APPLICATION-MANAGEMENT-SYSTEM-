// pages/ApplicantProfilePage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ApplicantProfilePage = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'Name 1', status: 'Pending', remarks: 'Incomplete Requirements', isEditing: false },
    { id: 2, name: 'Name 2', status: 'Approved', remarks: 'Complete', isEditing: false },
    { id: 3, name: 'Name 3', status: 'Rejected', remarks: 'Did not meet GPA requirement', isEditing: false },
  ]);

  const handleEdit = (id) => {
    setApplicants(applicants.map(app =>
      app.id === id ? { ...app, isEditing: !app.isEditing } : app
    ));
  };

  const handleChange = (id, field, value) => {
    setApplicants(applicants.map(app =>
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Applicant Profile List</h2>
          <button style={styles.closeBtn} onClick={() => navigate('/welcome')}>✕</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Applicant Profile</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Remarks</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(app => (
                <tr key={app.id} style={styles.tr}>
                  <td style={styles.td}>{app.name}</td>
                  <td style={styles.td}><Link to={`/applicants/${app.id}`} style={styles.link}>View Profile</Link></td>
                  <td style={styles.td}>
                    {app.isEditing ? (
                      <select
                        value={app.status}
                        onChange={(e) => handleChange(app.id, 'status', e.target.value)}
                        style={styles.select}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      <span style={{ ...styles.badge, ...getStatusColor(app.status) }}>{app.status}</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {app.isEditing ? (
                      <input
                        type="text"
                        value={app.remarks}
                        onChange={(e) => handleChange(app.id, 'remarks', e.target.value)}
                        style={styles.input}
                      />
                    ) : (
                      app.remarks
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionGroup}>
                      <button style={styles.iconBtn}><FaTrashAlt color="red" /></button>
                      <button style={styles.iconBtn} onClick={() => handleEdit(app.id)}>
                        <FaEdit color={app.isEditing ? 'gray' : 'green'} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved': return { backgroundColor: '#d4edda', color: '#155724' };
    case 'Rejected': return { backgroundColor: '#f8d7da', color: '#721c24' };
    case 'Pending':
    default: return { backgroundColor: '#fff3cd', color: '#856404' };
  }
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
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  thead: {
    backgroundColor: '#f0f0f0'
  },
  th: {
    padding: '1rem',
    textAlign: 'center',
    fontWeight: '600',
    color: 'var(--acadia)',
    borderBottom: '2px solid #ddd'
  },
  tr: {
    borderBottom: '1px solid #eee'
  },
  td: {
    padding: '1rem',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    marginRight: '0.5rem'
  },
  actionGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge: {
    padding: '0.3rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  link: {
    color: 'var(--sanguine-brown)',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  input: {
    padding: '0.4rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%'
  },
  select: {
    padding: '0.4rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%'
  }
};

export default ApplicantProfilePage;