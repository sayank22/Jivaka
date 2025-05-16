import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from '../pages/HomePage';
import About from '../pages/About';
import LoginPage from '../pages/LoginPage';
import DoctorDashboard from '../pages/Dashboards/DoctorDashboard';
import PatientDashboard from '../pages/Dashboards/PatientDashboard';
import HospitalDashboard from '../pages/Dashboards/HospitalDashboard';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
    return !!token;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login/:role" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/doctor"
          element={isAuthenticated() ? <DoctorDashboard /> : <Navigate to="/login/doctor" />}
        />
        <Route
          path="/patient"
          element={isAuthenticated() ? <PatientDashboard /> : <Navigate to="/login/patient" />}
        />
        <Route
          path="/hospital"
          element={isAuthenticated() ? <HospitalDashboard /> : <Navigate to="/login/hospital" />}
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
