import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const UserList = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const allUsers = api.getAllUsers();
    setUsers(allUsers);
    const user = JSON.parse(localStorage.getItem('instagram_current_user') || 'null');
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    api.logout();
    window.location.reload();
  };

  return (
    <div className="user-list-overlay">
      <div className="user-list-modal">
        <div className="user-list-header">
          <h3><i className="fas fa-users" /> Registered Users</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {currentUser && (
          <div className="current-user-badge">
            <i className="fas fa-user-check" style={{ color: '#0095f6' }} />
            Logged in as: <strong>{currentUser.username}</strong>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt" /> Logout
            </button>
          </div>
        )}

        <div className="user-list">
          {users.length === 0 ? (
            <p className="no-users">No users registered yet.</p>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className={currentUser?.id === user.id ? 'current-user' : ''}>
                    <td>{index + 1}</td>
                    <td>
                      {user.username}
                      {currentUser?.id === user.id && (
                        <span className="you-badge"> (You)</span>
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.fullName || user.username}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="user-list-footer">
          <span className="user-count">Total: {users.length} users</span>
          <button className="refresh-btn" onClick={() => window.location.reload()}>
            <i className="fas fa-sync" /> Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;