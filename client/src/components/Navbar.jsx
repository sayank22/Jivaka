import React, { useRef, useState } from "react";
import { useUser, useClerk, SignOutButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logoImage from '../assets/logo.png';
import { Menu, Sun, Moon } from "lucide-react";
import { useInteractiveMotion, useStaggerReveal } from '../hooks/useGsapMotion';
import AppSidebar from './AppSidebar';

const Navbar = ({ theme, toggleTheme }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  useStaggerReveal(navRef, '[data-motion-nav-item]', { y: -8, duration: 0.32, stagger: 0.05 });
  useInteractiveMotion(navRef);
  const closeSidebar = () => {
    setSidebarOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  };

  return (
    <>
    <nav ref={navRef} className="bg-surface text-surface-foreground px-4 py-8 flex justify-between items-center relative dark:bg-surface dark:text-surface-foreground transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
          aria-expanded={sidebarOpen}
          aria-controls="app-sidebar"
          data-motion-nav-item
          data-motion-interactive
          className="rounded-md border border-border bg-background p-2 text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      <Link to="/" data-motion-nav-item data-motion-interactive>
        <img
          src={logoImage}
          alt="Jivaka Logo"
          className="w-14 h-14 object-contain"
        />
      </Link>
      </div>

      <div className="text-surface-foreground ml-auto flex items-center space-x-4 text-lg font-bold dark:text-surface-foreground">
        <Link to="/feedback" data-motion-nav-item data-motion-interactive className="hover:underline">Feedback</Link>
        <Link to="/" data-motion-nav-item data-motion-interactive className="hover:underline">Home</Link>

        <button
  type="button"
  onClick={toggleTheme}
          aria-label="Toggle theme"
          data-motion-nav-item
          data-motion-interactive
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
    <AppSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </>
  );
};

export default Navbar;
