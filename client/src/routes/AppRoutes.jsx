import React, { useRef, useState } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SignIn, SignUp } from '@clerk/clerk-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import Feedback from '../pages/Feedback';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DoctorDashboard from '../pages/Dashboards/DoctorDashboard';
import PatientDashboard from '../pages/Dashboards/PatientDashboard';
import HospitalDashboard from '../pages/Dashboards/HospitalDashboard';
import PaymentPage from '../pages/PaymentPage';

import ProtectedRoute from '../components/ProtectedRoute';
import { usePageReveal } from '../hooks/useGsapMotion';

const RouteTransition = ({ children, routeKey }) => {
  const transitionRef = useRef(null);
  usePageReveal(transitionRef, [routeKey]);
  return <main ref={transitionRef}>{children}</main>;
};

const AppRoutes = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Paths where you don't want to show Navbar or Footer
  const hideNavbarPaths = ['/sign-in', '/sign-up'];
  const hideFooterPaths = ['/sign-in', '/sign-up'];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar theme={theme} toggleTheme={toggleTheme} onOpenFeedback={() => setFeedbackOpen(true)} />}

      <RouteTransition routeKey={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Navigate to="/" replace />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/signup/:role" element={<SignupPage />} />

          {/* Clerk Auth Routes */}
          <Route
            path="/sign-in"
            element={<SignIn routing="path" path="/sign-in" redirectUrl="/" />}
          />
          <Route
            path="/sign-up"
            element={<SignUp routing="path" path="/sign-up" redirectUrl="/" />}
          />

          {/* Protected Routes */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital"
            element={
              <ProtectedRoute>
                <HospitalDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </RouteTransition>

      {!shouldHideFooter && <Footer />}
      {feedbackOpen && <Feedback onClose={() => setFeedbackOpen(false)} />}
    </>
  );
};

export default AppRoutes;
