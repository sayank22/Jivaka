import React from "react";
import { useUser, useClerk, SignOutButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import logoImage from '../assets/logo.png';
import { Sun, Moon } from "lucide-react";

const Navbar = ({ theme, toggleTheme }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();

  // Check if current route is a dashboard
  const isDashboard = location.pathname.includes("dashboard");

  return (
    <nav className="bg-surface text-surface-foreground px-4 py-8 flex justify-between items-center relative dark:bg-surface dark:text-surface-foreground transition-colors duration-300">
      <Link to="/">
        <img
          src={logoImage}
          alt="Jivaka Logo"
          className="absolute top-4 left-6 w-20 h-20 object-contain"
        />
      </Link>

      <div className="text-surface-foreground ml-auto flex items-center space-x-4 text-lg font-bold dark:text-surface-foreground">
        <Link to="/feedback" className="hover:underline">Feedback</Link>
        <Link to="/" className="hover:underline">Home</Link>

        <button
  type="button"
  onClick={toggleTheme}
  aria-label="Toggle theme"
  className="rounded-full border border-input bg-background p-2 text-foreground shadow-sm transition hover:bg-muted/70 dark:bg-surface dark:border-border"
>
  {theme === "dark" ? (
  <Sun className="h-5 w-5 transition-all duration-300 hover:rotate-180" />
) : (
  <Moon className="h-5 w-5 transition-all duration-300 hover:-rotate-12" />
)}
</button>



        {/* Show Sign Out button only on dashboards and if logged in */}
        {user && (
          <div className="flex items-center space-x-4">
            <SignOutButton
              onClick={() => signOut()}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-2 py-2 rounded"
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
