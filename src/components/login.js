import React from 'react';

const Login = ({ 
  username, 
  setUsername, 
  password, 
  setPassword, 
  loading, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Mobile number, username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      <button type="submit" className="btn" disabled={loading}>
        {loading ? <i className="fas fa-spinner fa-pulse" style={{ marginRight: 8 }} /> : null}
        Log In
      </button>
    </form>
  );
};

export default Login;