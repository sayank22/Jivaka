import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, provider } from '../firebase'; // Your firebase setup file
import { signInWithPopup } from 'firebase/auth'; // ✅ Import directly from Firebase

const LoginPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (!role) {
      navigate('/');
    }
  }, [role, navigate]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);const user = result.user;
      const token = await user.getIdToken();
      

      // Save user info
      localStorage.setItem('token', token);
      localStorage.setItem('role', role || '');
      localStorage.setItem('email', user.email || '');
      localStorage.setItem('name', user.displayName || '');

      // Redirect based on role
      switch (role) {
        case 'doctor':
          navigate('/doctor');
          break;
        case 'patient':
          navigate('/patient');
          break;
        case 'hospital':
          navigate('/hospital');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-teal-700 mb-4">
          Login as {role?.charAt(0).toUpperCase() + role?.slice(1)}
        </h1>
        <p className="text-gray-600 mb-6">Sign in using Google to continue.</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Sign in with Google
        </button>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;