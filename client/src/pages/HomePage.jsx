import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  UserIcon,
  StethoscopeIcon,
  Building2Icon,
  Search,
  Calendar,
  CheckCircle,
  CreditCard,
  ClipboardList,
  FileText,
  Upload,
  DollarSign,
  Users,
  UserCog,
  Hospital,
  Microscope,
  CalendarClock,
  TabletSmartphone,
  FlaskConical,
  Wallet
} from 'lucide-react';

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

const features = [
  {
    icon: '📄',
    label: 'Electronic Health Records',
    description: 'Store, manage, and access patient records digitally with ease and security.',
  },
  {
    icon: '📅',
    label: 'Appointment Scheduling',
    description: 'Easily book, reschedule, and track appointments with doctors.',
  },
  {
    icon: '💊',
    label: 'Prescription Management',
    description: 'Generate, view, and refill prescriptions electronically.',
  },
  {
    icon: '🔔',
    label: 'Notifications and Alerts',
    description: 'Stay updated with appointment reminders and important alerts.',
  },
  {
    icon: '🧑‍⚕️',
    label: 'Role-based Dashboards',
    description: 'Different views and features tailored for doctors, patients, and admins.',
  },
  {
    icon: '🔐',
    label: 'Secure Login & Access',
    description: 'Data is protected with secure login, encryption, and access control.',
  },
];



const HomePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Patient');
  const [expandedIndex, setExpandedIndex] = useState(null);
  


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
            className="absolute top-16 right-6 bg-white shadow-lg rounded-md w-40 z-50 border border-gray-200 before:content-[''] before:absolute before:-top-2 before:right-4 before:border-8 before:border-transparent before:border-b-white"
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
<div className="overflow-hidden bg-teal-700 text-white py-3">
  <div className="flex flex-nowrap gap-8 animate-marquee whitespace-nowrap">
    {[
      { label: 'Doctors', value: '5,300', icon: '🩺' },
      { label: 'Diagnostic Tests', value: '12,400', icon: '🧪' },
      { label: 'Hospitals', value: '280', icon: '🏥' },
      { label: 'Patients Served', value: '1,250,000', icon: '👥' },
    ].map((item, idx) => (
      <div key={idx} className="flex items-center gap-2 min-w-fit">
        <span>{item.icon}</span>
        <span className="font-light">{item.label}:</span>
        <span className="font-semibold">{item.value}</span>
        <div className="w-2 h-2 bg-white opacity-60 rounded-full mx-3" />
      </div>
    ))}
    {[
      { label: 'Doctors', value: '5,300', icon: '🩺' },
      { label: 'Diagnostic Tests', value: '12,400', icon: '🧪' },
      { label: 'Hospitals', value: '280', icon: '🏥' },
      { label: 'Patients Served', value: '1,250,000', icon: '👥' },
    ].map((item, idx) => (
      <div key={idx} className="flex items-center gap-2 min-w-fit">
        <span>{item.icon}</span>
        <span className="font-light">{item.label}:</span>
        <span className="font-semibold">{item.value}</span>
        <div className="w-2 h-2 bg-white opacity-60 rounded-full mx-3" />
      </div>
    ))}
    {[
      { label: 'Doctors', value: '5,300', icon: '🩺' },
      { label: 'Diagnostic Tests', value: '12,400', icon: '🧪' },
      { label: 'Hospitals', value: '280', icon: '🏥' },
      { label: 'Patients Served', value: '1,250,000', icon: '👥' },
    ].map((item, idx) => (
      <div key={idx + 100} className="flex items-center gap-2 min-w-fit">
        <span>{item.icon}</span>
        <span className="font-light">{item.label}:</span>
        <span className="font-semibold">{item.value}</span>
        <div className="w-2 h-2 bg-white opacity-60 rounded-full mx-3" />
      </div>
    ))}
  </div>
</div>

      {/* Role Cards */}
      <motion.div
        className="bg-teal-100 shadow-2xl rounded-2xl p-10 text-center max-w-5xl w-full mx-auto"
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
              className="bg-purple-100 rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center transition duration-300 border border-gray-100"
            >
              <img
                src={role.image}
                alt={role.label}
                className="w-36 h-36 mb-4 rounded-xl shadow-md object-cover border-4 border-white"
              />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {role.description}
              </h2>
              <button
                onClick={() => navigate(role.path)}
                className={`${role.color} text-white px-4 py-2 rounded-lg mt-auto w-full md:w-auto transition`}
              >
                Continue as {role.label}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Description */}
      <div className="text-right pt-28 pl-6 pr-6 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-teal-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Fast, Easy<br />
          and Safe
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Blazingly fast, super-easy app to book. A customer friendly app by the Students in collaboration with leading tech companies. Creating a symbiotic community.
        </motion.p>
        </div>
<div className="overflow-hidden bg-teal-700 text-white py-3">
  <div className="flex flex-nowrap gap-8 animate-marquee whitespace-nowrap">
    {[
      { label: 'Doctors can easily manage every task', icon: '🩺' },
      { label: 'Diagnostic Tests uploaded & managed', icon: '🧪' },
      { label: 'Can manage schedule & Staff in Hospital', icon: '🏥' },
      { label: 'Patients can see, book pay safely', icon: '👥' },
    ].map((item, idx) => (
      <div key={idx} className="flex items-center gap-2 min-w-fit">
        <span>{item.icon}</span>
        <span className="font-light">{item.label}</span>
        <div className="w-2 h-2 bg-white opacity-60 rounded-full mx-3" />
      </div>
    ))}
    {[
      { label: 'Doctors',  icon: '🩺' },
      { label: 'Diagnostic Tests', icon: '🧪' },
      { label: 'Hospitals', icon: '🏥' },
      { label: 'Patients Served', icon: '👥' },
    ].map((item, idx) => (
      <div key={idx} className="flex items-center gap-2 min-w-fit">
        <span>{item.icon}</span>
        <span className="font-light">{item.label}</span>
        <div className="w-2 h-2 bg-white opacity-60 rounded-full mx-3" />
      </div>
    ))}
    {[
      { label: 'Doctors', icon: '🩺' },
      { label: 'Diagnostic Tests', icon: '🧪' },
      { label: 'Hospitals', icon: '🏥' },
      { label: 'Patients Served', icon: '👥' },
    ].map((item, idx) => (
      <div key={idx + 100} className="flex items-center gap-2 min-w-fit">
        <span>{item.icon}</span>
        <span className="font-light">{item.label}</span>
        <div className="w-2 h-2 bg-white opacity-60 rounded-full mx-3" />
      </div>
    ))}
  </div>
</div>
      {/* How It Works Section */}
<div className="mt-20 max-w-4xl mx-auto px-6 text-center">
  <h2 className="text-3xl font-bold text-teal-700 mb-6">How It Works</h2>

  {/* Tab Buttons */}
  <div className="flex justify-center gap-4 mb-6">
    {['Patient', 'Doctor', 'Hospital'].map((role) => (
      <button
        key={role}
        onClick={() => setSelectedRole(role)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
          selectedRole === role
            ? 'bg-teal-600 text-white shadow-lg'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {role}
      </button>
    ))}
  </div>

  {/* Role Content */}
  <AnimatePresence mode="wait">
    {selectedRole === 'Patient' && (
      <motion.div
        key="patient"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-teal-100 p-6 rounded-xl shadow-xl border-l-4 border-green-400 text-left"
      >
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-green-600" /> Patient Flow
        </h3>
        <ul className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <Search className="w-4 h-4 mt-1 text-gray-600" />
            <span>Check <strong>Doctors</strong>, <strong>Hospitals</strong>, and <strong>Diagnostic Centers</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <Calendar className="w-4 h-4 mt-1 text-gray-600" />
            <span>Book a doctor as per need (fees, availability, specialization)</span>
          </li>
          <li className="flex items-start gap-2">
            <StethoscopeIcon className="w-4 h-4 mt-1 text-gray-600" />
            <span>Visit the doctor → Get consultation / prescriptions / tests</span>
          </li>
          <li className="flex items-start gap-2">
            <CreditCard className="w-4 h-4 mt-1 text-gray-600" />
            <span>Pay directly — 100% fee goes to the doctor via clinic</span>
          </li>
        </ul>
      </motion.div>
    )}

    {selectedRole === 'Doctor' && (
      <motion.div
        key="doctor"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-teal-100 p-6 rounded-xl shadow-xl border-l-4 border-blue-400 text-left"
      >
        <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <UserCog className="w-5 h-5 text-blue-600" /> Doctor Flow
        </h3>
        <ul className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <ClipboardList className="w-4 h-4 mt-1 text-gray-600" />
            <span>Check schedule and clinic assignments</span>
          </li>
          <li className="flex items-start gap-2">
            <Hospital className="w-4 h-4 mt-1 text-gray-600" />
            <span>Visit assigned hospital/clinic</span>
          </li>
          <li className="flex items-start gap-2">
            <Microscope className="w-4 h-4 mt-1 text-gray-600" />
            <span>See patients and give prescriptions/tests</span>
          </li>
          <li className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 mt-1 text-gray-600" />
            <span>Receive consultation fees directly</span>
          </li>
        </ul>
      </motion.div>
    )}

    {selectedRole === 'Hospital' && (
      <motion.div
        key="hospital"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-teal-100 p-6 rounded-xl shadow-xl border-l-4 border-purple-400 text-left"
      >
        <h3 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
          <Building2Icon className="w-5 h-5 text-purple-600" /> Hospital Flow
        </h3>
        <ul className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <CalendarClock className="w-4 h-4 mt-1 text-gray-600" />
            <span>Manage doctor schedules and hospital staff</span>
          </li>
          <li className="flex items-start gap-2">
            <TabletSmartphone className="w-4 h-4 mt-1 text-gray-600" />
            <span>Take appointments and assign doctors</span>
          </li>
          <li className="flex items-start gap-2">
            <FlaskConical className="w-4 h-4 mt-1 text-gray-600" />
            <span>Perform diagnostic tests and upload results</span>
          </li>
          <li className="flex items-start gap-2">
            <Wallet className="w-4 h-4 mt-1 text-gray-600" />
            <span>Receive payment and manage reports</span>
          </li>
        </ul>
      </motion.div>
    )}
  </AnimatePresence>
</div>

{/* Description */}
      <div className="text-center pt-28 pl-6 pr-6 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-teal-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            By the People<br />
          For the people
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
           You pay less. There is no commission or middle-men. Direct payment between Doctors, patients and Hospitals. 0% surge and 0% commission.
        </motion.p>
      </div>

      {/* Features */}
      <div className="mt-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-blue-200 p-6 rounded-xl shadow-md cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            >
              <div className="text-4xl mb-2">{feature.icon}</div>
              <p className="text-lg font-medium text-gray-700">{feature.label}</p>
              {expandedIndex === i && (
                <motion.p
                  className="text-sm text-gray-600 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
{/* Extended Footer Section */}
<section className="bg-teal-50 border-t mt-20 py-16">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-teal-800 text-center mb-4">
      One App. All Your Healthcare Needs.
    </h2>
    <p className="text-center text-gray-600 text-lg mb-10">
      Jivaka is a single platform tailored for Patients, Doctors, and Hospitals.
    </p>

    <div className="grid md:grid-cols-3 gap-8 text-gray-700">
      {/* Product Column */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-teal-700">Product for the Future</h3>
        <ul className="space-y-2">
          <li>• Patient App</li>
          <li>• Doctor App</li>
          <li>• Hospital & Diagnosis Center App</li>
        </ul>
      </div>

      {/* About Column */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-teal-700">About</h3>
        <ul className="space-y-2">
          <li>
            <Link
  to="/about"
  className="relative font-bold text-purple-700 transition-all duration-300 hover:text-purple-900 hover:scale-105 inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-900 after:transition-all after:duration-300 hover:after:w-full"
>
  Who am I
</Link>

          </li>
          <li className="text-gray-700 font-medium">Plans:</li>
          <li>- Basic Access: Free for patients and doctors</li>
          <li>- Premium: ₹499/month for full hospital analytics</li>
          <li>- Enterprise: Custom plan for large hospitals</li>
        </ul>
      </div>

      {/* Contact Column */}
      <div>
  <h3 className="text-xl font-semibold mb-3 text-teal-700">Contact Me</h3>
  <ul className="space-y-3">
    <li>
      <a
        href="https://github.com/sayank22/Jivaka"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-800"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.89.58.1.79-.25.79-.56 0-.27-.01-1.01-.01-1.98-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.07-.74.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.75 1.28 3.42.98.11-.76.41-1.28.74-1.58-2.55-.29-5.24-1.27-5.24-5.65 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.19 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.22-1.49 3.18-1.18 3.18-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.39-2.69 5.35-5.26 5.63.42.37.8 1.1.8 2.21 0 1.6-.01 2.89-.01 3.29 0 .31.21.66.8.55C20.72 21.37 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z" />
        </svg>
        GitHub
      </a>
    </li>
    <li>
      <a
        href="https://www.linkedin.com/in/sayan-kundu-70b5442b6/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02] hover:shadow-md"
      >
        💼 LinkedIn
      </a>
    </li>
    <li>
      <a
        href="mailto:sayank10023@gmail.com"
        className="flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-red-50 hover:scale-[1.02] hover:shadow-md"
      >
        📧 Email: sayank10023@gmail.com
      </a>
    </li>
    <li>
      <a
        href="https://www.instagram.com/sayankun22/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-pink-50 hover:scale-[1.02] hover:shadow-md"
      >
        📷 Instagram
      </a>
    </li>
  </ul>
</div>

    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-500 border-t mt-20">
        <p>
          © {new Date().getFullYear()}{' '}
          <strong className="text-teal-700 font-semibold">Jivaka</strong> • Made By Sayan Kundu in India
        </p>
      </footer>

      {/* Modal for Plans */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-40 flex justify-center items-center z-50"
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
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
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
