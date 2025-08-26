import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { strapiAuth } from '../services/strapi-auth';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.variant === 'secondary'
      ? `
    background: transparent;
    color: #666;
    border: 1px solid #e0e0e0;
    
    &:hover {
      background: #f8f8f8;
    }
  `
      : `
    background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
  `}
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #666;

  button {
    background: none;
    border: none;
    color: #4ade80;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #d00;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background: #e6f7ed;
  color: #22c55e;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

interface EmailLoginFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ onSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Login
        const response = await strapiAuth.login(formData.email, formData.password);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onSuccess?.();
          onClose?.();
        }, 1500);
      } else {
        // Register
        const response = await strapiAuth.register(
          formData.email,
          formData.password,
          formData.username || formData.email.split('@')[0]
        );
        setSuccess('Registration successful! Logging you in...');
        setTimeout(() => {
          onSuccess?.();
          onClose?.();
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormContainer>
      <FormTitle>{isLogin ? 'Log In' : 'Sign Up'}</FormTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
        </Button>

        {onClose && (
          <Button type="button" variant="secondary" onClick={onClose} style={{ marginTop: '1rem' }}>
            Cancel
          </Button>
        )}
      </form>

      <ToggleText>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </ToggleText>
    </FormContainer>
  );
};

export default EmailLoginForm;