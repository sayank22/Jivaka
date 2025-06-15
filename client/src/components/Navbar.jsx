import React from "react";
import { useUser, useClerk, SignOutButton  } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import logoImage from '../assets/logo.png';

const Navbar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();

  // Check if current route is a dashboard
  const isDashboard = location.pathname.includes("dashboard");

  return (
    <nav className="bg-teal-100 text-white px-4 py-10 flex justify-between items-center relative">
      <Link to="/">
        <img
          src={logoImage}
          alt="Jivaka Logo"
          className="absolute top-4 left-6 w-20 h-20 object-contain"
        />
      </Link>

      <div className="text-teal-700 ml-auto flex items-center space-x-4 text-xl font-bold">
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/" className="hover:underline">Home</Link>

        {/* Show Sign Out button only on dashboards and if logged in */}
        {user && (
          <div className="flex items-center space-x-4">
          <SignOutButton
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Sign Out
          </SignOutButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
