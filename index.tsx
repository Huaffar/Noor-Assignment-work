import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mount = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Could not find root element to mount to");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Critical rendering error:", err);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; text-align: center;">
        <h2 style="color: #e11d48;">System Initialization Error</h2>
        <p>There was a problem loading the platform. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="background: #e11d48; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Refresh Now</button>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
