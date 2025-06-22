
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../ui/Button';

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);

  if (!auth) return null;
  const { register, loading } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const success = await register(username, email, password);
    if (success) {
      onClose();
      alert('Registration successful! You are now logged in.');
    } else {
      // Error is usually set within auth.register if email exists
      if (!error) setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="register-modal-title">
      <div className="modal-content w-full max-w-md animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 id="register-modal-title" className="text-2xl font-playfair font-bold text-brand-primary">Create Account</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close registration modal">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="register-username" className="block text-sm font-medium text-brand-text-light mb-1">Username</label>
            <input
              type="text"
              id="register-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="register-email" className="block text-sm font-medium text-brand-text-light mb-1">Email</label>
            <input
              type="email"
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="register-password" className="block text-sm font-medium text-brand-text-light mb-1">Password</label>
            <input
              type="password"
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="register-confirm-password" className="block text-sm font-medium text-brand-text-light mb-1">Confirm Password</label>
            <input
              type="password"
              id="register-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full mb-4" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="text-center text-sm text-brand-text-light">
          Already have an account?{' '}
          <button onClick={() => { onClose(); onSwitchToLogin(); }} className="font-medium text-brand-primary hover:underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
