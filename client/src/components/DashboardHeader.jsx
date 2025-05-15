import React from 'react';
import { getAuth } from 'firebase/auth';

const DashboardHeader = () => {
  const user = getAuth().currentUser;

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-6">
      {user ? (
        <h2 className="text-lg font-semibold">
          Welcome, {user.displayName || user.email}
        </h2>
      ) : (
        <h2 className="text-red-500">Not logged in</h2>
      )}
    </div>
  );
};

export default DashboardHeader;
