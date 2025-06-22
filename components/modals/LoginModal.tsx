
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../ui/Button';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);

  if (!auth) return null; // Or some loading/error state
  const { login, loading } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      onClose();
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <div className="modal-content w-full max-w-md animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 id="login-modal-title" className="text-2xl font-playfair font-bold text-brand-primary">Login</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close login modal">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="login-email" className="block text-sm font-medium text-brand-text-light mb-1">Email</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
              aria-required="true"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="login-password" className="block text-sm font-medium text-brand-text-light mb-1">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
              aria-required="true"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full mb-4" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="text-center text-sm text-brand-text-light">
          Don't have an account?{' '}
          <button onClick={() => { onClose(); onSwitchToRegister(); }} className="font-medium text-brand-primary hover:underline">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
