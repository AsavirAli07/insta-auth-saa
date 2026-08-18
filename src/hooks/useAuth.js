import { useState } from 'react';
import { api } from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const handleAuth = async (mode, formData) => {
    setError('');
    setSuccessData(null);
    setLoading(true);

    try {
      let result;
      if (mode === 'login') {
        result = await api.login(formData);
      } else {
        result = await api.signup(formData);
      }
      setSuccessData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearState = () => {
    setError('');
    setSuccessData(null);
  };

  return {
    loading,
    error,
    successData,
    handleAuth,
    clearState
  };
};