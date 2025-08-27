import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 480px;
  padding: 3rem 2rem;
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #e3f2ff;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  max-width: 380px;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  background: white;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f8f8;
    border-color: #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const EmailLink = styled.button`
  background: none;
  border: none;
  color: #5b3bf5;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #4329e0;
  }
`;

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

interface SocialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialLoginModal: React.FC<SocialLoginModalProps> = ({ isOpen, onClose }) => {
  const { actions } = useDataBridge();

  const handleGoogleLogin = async () => {
    console.log('Google login clicked');
    
    // Check if we're in development or production
    const isDevelopment = window.location.hostname === 'localhost';
    
    if (isDevelopment) {
      // In development, show what would happen
      alert('In production, this would redirect to Dutchie Google OAuth login');
      console.log('Development mode: Would redirect to Dutchie Google login');
      
      // For testing, you can still use your Strapi auth
      window.location.href = 'http://localhost:1337/api/connect/google';
    } else {
      // In production, Dutchie handles OAuth directly
      // Option 1: If Dutchie supports direct OAuth URLs
      window.location.href = '/auth/google'; // Dutchie's Google OAuth endpoint
      
      // Option 2: If Dutchie only has a general login page
      // actions.goToLogin();
    }
    
    onClose();
  };

  const handleAppleLogin = async () => {
    console.log('Apple login clicked - redirecting to Dutchie login');
    try {
      // Use Dutchie's built-in login system for Apple as well
      actions.goToLogin();
      onClose(); // Close our custom modal
    } catch (error) {
      console.error('Dutchie login error:', error);
    }
  };

  const handleEmailLogin = () => {
    console.log('Email login clicked - redirecting to Dutchie login');
    // For consistency, also use Dutchie's login for email
    actions.goToLogin();
    onClose(); // Close our custom modal
  };

  // Prevent closing when clicking modal content
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={handleModalClick}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        
        <Header>
          <Icon>✨</Icon>
          <Title>Log in for the best experience</Title>
          <Description>
            Enjoy personalized recommendations, faster checkout, and quick reordering of your favorites.
          </Description>
        </Header>

        <ButtonGroup>
          <SocialButton onClick={handleGoogleLogin}>
            <GoogleIcon />
            Continue with Google
          </SocialButton>

          <SocialButton onClick={handleAppleLogin}>
            <AppleIcon />
            Continue with Apple
          </SocialButton>
        </ButtonGroup>

        <div style={{ textAlign: 'center' }}>
          <EmailLink onClick={handleEmailLogin}>
            Log in or sign up with email
          </EmailLink>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

// Wrapper component for Dutchie SDK
const SocialLoginBoundary: RemoteBoundaryComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Expose modal control globally so header/hero can trigger it
  React.useEffect(() => {
    (window as any).openSocialLogin = () => setIsModalOpen(true);
  }, []);

  return (
    <>
      <SocialLoginModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* Test button - remove in production */}
      <button 
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '1rem 2rem',
          background: '#4ade80',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 1000,
          fontWeight: 600
        }}
      >
        Test Social Login
      </button>
    </>
  );
};

SocialLoginBoundary.DataBridgeVersion = '1';

export default SocialLoginBoundary;