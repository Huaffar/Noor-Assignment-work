
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { App } from '@capacitor/app';

export const useMobileBack = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = async () => {
      // Root pages where the app should close
      const rootPages = ['/', '/login', '/dashboard'];
      
      if (rootPages.includes(location.pathname)) {
        await App.exitApp();
      } else {
        // Go back in history
        navigate(-1);
      }
    };

    const backListener = App.addListener('backButton', () => {
      handleBackButton();
    });

    return () => {
      backListener.then(l => l.remove());
    };
  }, [location, navigate]);
};
