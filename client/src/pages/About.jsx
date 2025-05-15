import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 px-6 py-16">
      <motion.div
         className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 px-6 py-16"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -50 }}
  transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold text-teal-800 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          About Jivaka Hospital Management System
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <strong>Jivaka</strong> is a modern Indian hospital management system designed for
          patients, doctors, and hospital staff. It streamlines everything from appointments and prescriptions to dashboards and access controls —
          enabling healthcare professionals to focus on what truly matters: <em>caring for people</em>.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Technologies Used
        </motion.h2>
        <ul className="text-gray-800 space-y-1 list-disc pl-6">
          <li><strong>Frontend:</strong> React, HTML, CSS, Tailwind</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> MongoDB</li>
          <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
        </ul>

        <motion.h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          About the Developer
        </motion.h2>
        <motion.p className="text-gray-700">
          Hi, I'm <strong>Sayan Kundu</strong>, a 23-year-old Computer Science Engineering student from Netaji Subhash Engineering College. I'm passionate
          about developing real-world solutions, and <strong>Jivaka</strong> is one of my final-year capstone projects aimed at improving the healthcare sector
          through smart and intuitive technology.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Key Features
        </motion.h2>
        <ul className="text-gray-800 space-y-2 list-disc pl-6">
          <li>🩺 Role-based Portals: Doctor, Patient, and Hospital staff dashboards.</li>
          <li>📅 Appointment Scheduling and Management.</li>
          <li>💊 Prescription Tracking and Medical Records.</li>
          <li>🔔 Notification and Alert System.</li>
          <li>🔒 Secure Authentication using JWT.</li>
          <li>📱 Fully Responsive Design for all screen sizes.</li>
        </ul>

        <p className="mt-10 text-center text-gray-600 italic">
          “Technology in healthcare isn’t about replacing doctors — it's about empowering them.”
        </p>
      </motion.div>
    </div>
  );
};

export default About;
