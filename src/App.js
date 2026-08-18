import React, { useState } from 'react';
import Login from './components/login';
import Signup from './components/signup';
import AuthCard from './components/authCard';
import UserList from './components/UserList';
import { useAuth } from './hooks/useAuth';
import './styles/AuthStyles.css';

const App = () => {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  
  const { loading, error, successData, handleAuth, clearState } = useAuth();

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'signup' : 'login'));
    clearState();
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const validateForm = () => {
    if (mode === 'login') {
      if (!username.trim()) {
        throw new Error('Username, email or phone number is required.');
      }
      if (!password || password.length < 4) {
        throw new Error('Password must be at least 4 characters.');
      }
    } else {
      if (!username.trim()) {
        throw new Error('Username is required.');
      }
      if (!email || !email.includes('@') || !email.includes('.')) {
        throw new Error('Please enter a valid email address.');
      }
      if (!password || password.length < 4) {
        throw new Error('Password must be at least 4 characters.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      validateForm();
      
      const formData = mode === 'login' 
        ? { username, password }
        : { username, email, password };
      
      await handleAuth(mode, formData);
      
      // Clear fields on success
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      // Error already handled by useAuth
    }
  };

  return (
    <>
      <AuthCard 
        mode={mode} 
        error={error} 
        successData={successData} 
        toggleMode={toggleMode}
        onViewUsers={() => setShowUsers(true)}
        loading={loading} // Pass loading prop here
      >
        {mode === 'login' ? (
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loading={loading}
            onSubmit={handleSubmit}
          />
        ) : (
          <Signup
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            onSubmit={handleSubmit}
          />
        )}
      </AuthCard>

      {showUsers && (
        <UserList onClose={() => setShowUsers(false)} />
      )}
    </>
  );
};

export default App;