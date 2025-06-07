// src/App.jsx
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';
import { logout } from './api/auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setIsLoggedIn(false);
    } else {
      alert('Logout failed.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Fetch Rewards Registration</h1>

      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>
            Logout
          </button>
          <UserForm />
        </>
      )}
    </div>
  );
};

export default App;
