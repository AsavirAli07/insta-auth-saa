import React from 'react';

const Signup = ({ 
  username, 
  setUsername, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  loading, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Mobile number or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
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
        Sign Up
      </button>
    </form>
  );
};

export default Signup;