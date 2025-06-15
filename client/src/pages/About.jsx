import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 px-6 py-16">
      <motion.div
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
          About Our Project: Jivaka Hospital Management System
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <strong>Jivaka</strong> is a full-fledged hospital management system built as a final-year capstone project by five B.Tech Computer Science Engineering students from <strong>Netaji Subhash Engineering College</strong>: <strong>Tushar, Sambit, Debmalya, Arka</strong> and <strong>Sayan</strong>.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Why the Name “Jivaka”?
        </motion.h2>
        <motion.p className="text-gray-700 mb-6">
          The name <strong>Jivaka</strong> is inspired by the legendary physician <em>Jīvaka Komārabhacca</em> from ancient India, known for his mastery in Ayurvedic medicine and healing practices. We chose this name to reflect our vision of building a smart, respectful, and helpful healthcare platform for modern India — rooted in care, service, and intelligence.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Why We Built This
        </motion.h2>
        <motion.p className="text-gray-700 mb-6">
          India's healthcare systems — especially in semi-urban and rural areas — still face challenges in digitalization, appointment handling, patient record tracking, and transparency. We wanted to create a system that bridges this gap by enabling hospitals, doctors, and patients to work together through a modern, centralized, and secure platform. Jivaka is our contribution to a more accessible and efficient digital healthcare ecosystem.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Key Features
        </motion.h2>
        <ul className="text-gray-800 space-y-2 list-disc pl-6">
          <li>🧑‍⚕️ Separate Portals for <strong>Doctors</strong>, <strong>Patients</strong>, and <strong>Hospitals</strong>.</li>
          <li>📆 Simple and intuitive appointment booking and approval workflows.</li>
          <li>💊 Prescription management and past visit records accessible by both patient and doctor.</li>
          <li>📊 Hospital analytics and activity reports for hospital admins.</li>
          <li>🔐 Secure login and role-based access using Clerk authentication.</li>
          <li>📲 Mobile-first, fully responsive UI to support accessibility for all users.</li>
          <li>💬 Feedback system for users to share their concerns and suggestions.</li>
        </ul>

        <motion.h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What Makes Jivaka Stand Out?
        </motion.h2>
        <motion.p className="text-gray-700 mb-6">
          Unlike generic hospital software, Jivaka is built with a modern tech stack and UI/UX principles to make it easy, beautiful, and accessible — even for non-tech-savvy users. Our platform focuses not just on features, but also on user experience, data security, and real-time interaction between different user roles. With our custom dashboards and communication systems, hospitals can now truly manage their ecosystem digitally.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Meet the Team
        </motion.h2>
        <ul className="text-gray-800 space-y-1 pl-6 list-disc">
          <li><strong>Sayan Kundu</strong></li>
          <li><strong>Tushar Debnath</strong></li>
          <li><strong>Sambit Mitra</strong></li>
          <li><strong>Debmalya Roy</strong></li>
          <li><strong>Arka Maity</strong></li>
        </ul>

        <p className="mt-10 text-center text-gray-600 italic">
          “Technology in healthcare isn’t about replacing people — it’s about empowering them to deliver better care.”
        </p>
      </motion.div>
    </div>
  );
};

export default About;
