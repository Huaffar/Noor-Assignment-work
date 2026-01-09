
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

declare global {
  interface Window {
    OneSignal: any;
  }
}

export const useNotifications = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Standard OneSignal Web SDK Initialization with safety checks
    const initOneSignal = async () => {
      if (!window.OneSignal) return;
      
      window.OneSignal = window.OneSignal || [];
      window.OneSignal.push(function() {
        const appId = "YOUR_ONESIGNAL_APP_ID";
        if (appId === "YOUR_ONESIGNAL_APP_ID") {
          return;
        }
        
        window.OneSignal.init({
          appId: appId,
          safari_web_id: "web.onesignal.auto.6152...",
          notifyButton: {
            enable: true,
          },
          allowLocalhostAsSecureOrigin: true,
        });
      });
    };

    if (!document.getElementById('onesignal-sdk')) {
      const script = document.createElement('script');
      script.id = 'onesignal-sdk';
      script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
      script.async = true;
      document.head.appendChild(script);
      script.onload = initOneSignal;
      script.onerror = () => console.log("[SYSTEM] Notification SDK skip (expected in dev)");
    }
  }, []);

  // Set User ID when logged in
  useEffect(() => {
    if (isAuthenticated && user && window.OneSignal && typeof window.OneSignal.push === 'function') {
      window.OneSignal.push(function() {
        if (typeof window.OneSignal.setExternalUserId === 'function') {
          window.OneSignal.setExternalUserId(user.id);
        }
      });
    }
  }, [isAuthenticated, user]);
};
