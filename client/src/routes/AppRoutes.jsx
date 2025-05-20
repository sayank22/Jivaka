import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from '../pages/HomePage';
import About from '../pages/About';
import LoginPage from '../pages/LoginPage';
import DoctorDashboard from '../pages/Dashboards/DoctorDashboard';
import PatientDashboard from '../pages/Dashboards/PatientDashboard';
import HospitalDashboard from '../pages/Dashboards/HospitalDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login/:role" element={<LoginPage />} />

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
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
