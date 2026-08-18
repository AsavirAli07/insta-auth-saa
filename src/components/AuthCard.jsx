import React from 'react';

const AuthCard = ({ 
  mode, 
  children, 
  error, 
  successData, 
  toggleMode,
  onViewUsers,
  loading 
}) => {
  return (
    <div className="auth-container">
      <div className="card">
        {/* Instagram Logo - Exact Match */}
        <div className="logo-section">
          <div className="logo">
            <i className="fab fa-instagram" /> 
            <span>Instagram</span>
          </div>
          <div className="tagline">
            See everyday moments from your close friends.
          </div>
        </div>

        {children}

        {error && (
          <div className="error-box">
            <i className="fas fa-exclamation-circle" />
            {error}
          </div>
        )}

        {mode === 'login' && (
          <div className="forgot-password">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>
        )}

        {mode === 'login' && (
          <div className="divider">
            <span>OR</span>
          </div>
        )}

        {mode === 'login' && (
          <button className="facebook-login" disabled={loading}>
            <i className="fab fa-facebook-square" /> Log in with Facebook
          </button>
        )}

        <div className="toggle-mode">
          {mode === 'login' ? (
            <>
              Don't have an account? <span onClick={toggleMode}>Create new account</span>
            </>
          ) : (
            <>
              Already have an account? <span onClick={toggleMode}>Log in</span>
            </>
          )}
        </div>

        {successData && (
          <div className="mock-response">
            <strong>
              <i className="fas fa-check-circle" style={{ color: '#0095f6' }} /> Success!
            </strong>
            <br />
            {mode === 'login' ? 'Logged in as ' : 'Signed up as '}
            <strong>{successData.user?.username || 'user'}</strong>
            <br />
            <span style={{ fontSize: '0.7rem', color: '#5f6b7a' }}>
              Token: {successData.token?.slice(0, 20)}…
            </span>
          </div>
        )}

        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <button 
            className="view-users-btn"
            onClick={onViewUsers}
          >
            <i className="fas fa-users" /> View Registered Users
          </button>
        </div>

        <div className="api-status">
          <span className="badge">
            <i className="fas fa-server" /> Mock API
          </span>
          <span className="badge">
            <i className="fas fa-code" /> 
            POST /login
          </span>
          <span className="badge">
            <i className="fas fa-database" /> localStorage
          </span>
        </div>
      </div>

      <div className="meta-footer">
        <span>Meta</span>
      </div>
    </div>
  );
};

export default AuthCard;