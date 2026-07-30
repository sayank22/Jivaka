import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate('/');
    }
  }, [role, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-surface to-muted px-4">
      <div className="bg-card p-6 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">
          Login as {role?.charAt(0).toUpperCase() + role?.slice(1)}
        </h1>
        <p className="text-muted-foreground mb-6">Sign in using your preferred method below.</p>
        
        <div className="flex justify-center">
          <SignIn redirectUrl={`/${role}`} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
