import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';

const SignupPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Validate role; redirect home if invalid
    if (!role || !['doctor', 'patient', 'hospital'].includes(role)) {
      navigate('/');
    }
  }, [role, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-surface to-muted px-4">
      <div className="bg-card p-6 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-success mb-4">
          Sign Up as {role?.charAt(0).toUpperCase() + role?.slice(1)}
        </h1>
        <p className="text-muted-foreground mb-6">Create your account below.</p>

        <div className="flex justify-center">
          <SignUp redirectUrl={`/${role}`} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
