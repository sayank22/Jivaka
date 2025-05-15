import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import patientImage from '../assets/1.jpg';
import logoImage from '../assets/logo.png';

const roles = [
  {
    label: 'Doctor',
    description: 'Doctor and their Assistants',
    path: '/login/doctor',
    color: 'bg-blue-600 hover:bg-blue-700',
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
  },
  {
    label: 'Patient',
    description: 'Patient and Family',
    path: '/login/patient',
    color: 'bg-green-600 hover:bg-green-700',
    image: patientImage,
  },
  {
    label: 'Hospital',
    description: 'Hospital Staffs and Admin',
    path: '/login/hospital',
    color: 'bg-purple-600 hover:bg-purple-700',
    image: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png',
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 relative">
      {/* Logo */}
      <img
        src={logoImage}
        alt="Jivaka Logo"
        className="absolute top-6 left-6 w-20 h-20 object-contain"
      />

      {/* Hamburger Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-teal-800 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-6 bg-white shadow-lg rounded-md w-40 z-50"
          >
            <ul className="text-left text-gray-700">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Plans
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tagline */}
      <div className="text-left pt-28 pl-6 pr-6 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-teal-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Jivaka
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A modern Indian hospital management system for patients, doctors, and hospitals — rooted in tradition, built for the future.
        </motion.p>
      </div>

      {/* Role Cards */}
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-5xl w-full mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-teal-600 mb-10 text-xl font-semibold">
          Please select your role to continue:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <motion.div
              key={role.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-100 rounded-xl shadow-md p-6 flex flex-col items-center transition"
            >
              <img
                src={role.image}
                alt={role.label}
                className="w-36 h-36 mb-4 rounded-xl shadow-md object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {role.description}
              </h2>
              <button
                onClick={() => navigate(role.path)}
                className={`${role.color} text-white px-4 py-2 rounded-lg mt-auto transition`}
              >
                Continue as {role.label}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <div className="mt-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            'Electronic Health Records',
            'Appointment Scheduling',
            'Prescription Management',
            'Notifications and Alerts',
            'Role-based Dashboards',
            'Secure Login & Access'
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-800 font-medium">{feature}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-600 mt-20">
        © {new Date().getFullYear()} Jivaka • Made with care in India 🇮🇳
      </footer>

      {/* Modal for Plans */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-xl w-80 text-center relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-4 text-teal-700">Our Plans</h3>
              <p className="text-gray-600 mb-4 text-sm">
                - Basic Access: Free for patients and doctors<br />
                - Premium: ₹499/month for full hospital analytics<br />
                - Enterprise: Custom plan for large hospitals
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;