import React, { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true); // refresh token
        localStorage.setItem('token', token);
        localStorage.setItem('email', user.email || '');
        localStorage.setItem('name', user.displayName || '');
        // role is stored at login, no change here
      } else {
        localStorage.clear();
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
