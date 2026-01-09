
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KYC: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // KYC is now a Modal component, redirecting from standalone page
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  return null;
};

export default KYC;
