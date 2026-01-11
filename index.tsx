import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SystemProvider } from './context/SystemContext';

const mount = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <SystemProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SystemProvider>
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Initialization Panic:", err);
    rootElement.innerHTML = `
      <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:#fff5f6;font-family:sans-serif;">
        <div style="text-align:center;padding:40px;background:white;border-radius:32px;box-shadow:0 20px 50px rgba(0,0,0,0.05);">
          <h2 style="color:#e11d48;font-weight:900;">SYSTEM BLOCKED</h2>
          <p style="color:#64748b;margin:20px 0;">Kernel initialization failed. Please refresh.</p>
          <button onclick="window.location.reload()" style="background:#e11d48;color:white;border:none;padding:12px 24px;border-radius:12px;font-weight:800;cursor:pointer;">REBOOT HUB</button>
        </div>
      </div>`;
  }
};

mount();