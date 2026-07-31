import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  UserIcon,
  StethoscopeIcon,
  Building2Icon,
  Search,
  Calendar,
  CreditCard,
  ClipboardList,
  DollarSign,
  UserCog,
  Hospital,
  Microscope,
  CalendarClock,
  TabletSmartphone,
  FlaskConical,
  Wallet
} from 'lucide-react';

import patientImage from '../assets/1.jpg';
import { useDialogReveal, useInteractiveMotion, useStaggerReveal } from '../hooks/useGsapMotion';

const roles = [
  {
    label: 'Doctor',
    description: 'Doctor and their Assistants',
    path: '/login/doctor',
    color: 'bg-primary text-primary-foreground hover:bg-primary/90',
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
  },
  {
    label: 'Patient',
    description: 'Patient and Family',
    path: '/login/patient',
    color: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    image: patientImage,
  },
  {
    label: 'Hospital',
    description: 'Hospital Staffs and Admin',
    path: '/login/hospital',
    color: 'bg-accent text-accent-foreground hover:bg-accent/90',
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
  const [selectedRole, setSelectedRole] = useState('Patient');
  const pageRef = useRef(null);
  useStaggerReveal(pageRef, '[data-motion-hero]', { y: 16, duration: 0.5, stagger: 0.1 });
  useStaggerReveal(pageRef, '[data-motion-card]', { y: 14, duration: 0.42, stagger: 0.08 });
  useInteractiveMotion(pageRef);
  useDialogReveal(pageRef);
  


  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-tr from-surface to-muted relative">    

      {/* Tagline */}
      <div data-motion-hero className="text-left pt-28 pl-6 pr-6 max-w-4xl mx-auto">
        <Motion.h1
          className="text-5xl font-bold text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Jivaka
        </Motion.h1>
        <Motion.p
          className="text-lg text-muted-foreground mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A modern Indian hospital management system for patients, doctors, and hospitals — rooted in tradition, built for the future.
        </Motion.p>
      </div>
<div className="overflow-hidden bg-primary text-surface-foreground py-3">
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
        <div className="w-2 h-2 bg-card opacity-60 rounded-full mx-3" />
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
        <div className="w-2 h-2 bg-card opacity-60 rounded-full mx-3" />
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
        <div className="w-2 h-2 bg-card opacity-60 rounded-full mx-3" />
      </div>
    ))}
  </div>
</div>

      {/* Role Cards */}
      <Motion.div
        className="bg-surface shadow-2xl rounded-2xl p-10 text-center max-w-5xl w-full mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary mb-10 text-xl font-semibold">
          Please select your role to continue:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Motion.div
              key={role.label}
              data-motion-card
              data-motion-interactive
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-surface rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center transition duration-300"
            >
              <img
                src={role.image}
                alt={role.label}
                className="w-36 h-36 mb-4 rounded-xl shadow-md object-cover border-4 border-border"
              />
              <h2 className="text-xl font-semibold text-muted-foreground mb-2">
                {role.description}
              </h2>
              <button
                data-motion-interactive
                onClick={() => navigate(role.path)}
                className={`${role.color} text-surface-foreground px-4 py-2 rounded-lg mt-auto w-full md:w-auto transition`}
              >
                Continue as {role.label}
              </button>
            </Motion.div>
          ))}
        </div>
      </Motion.div>

      {/* Description */}
      <div className="text-right pt-28 pl-6 pr-6 max-w-4xl mx-auto">
        <Motion.h1
          className="text-5xl font-bold text-primary mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Fast, Easy<br />
          and Safe
        </Motion.h1>
        <Motion.p
          className="text-lg text-muted-foreground mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A customer friendly, Blazingly fast, super-easy app to book. 
        </Motion.p>
        </div>
<div className="overflow-hidden bg-primary text-surface-foreground py-3">
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
        <div className="w-2 h-2 bg-card opacity-60 rounded-full mx-3" />
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
        <div className="w-2 h-2 bg-card opacity-60 rounded-full mx-3" />
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
        <div className="w-2 h-2 bg-card opacity-60 rounded-full mx-3" />
      </div>
    ))}
  </div>
</div>
      {/* How It Works Section */}
<div className="mt-20 max-w-4xl mx-auto px-6 text-center">
  <h2 className="text-3xl font-bold text-primary mb-6">How It Works</h2>

  {/* Tab Buttons */}
  <div className="flex justify-center gap-4 mb-6">
    {['Patient', 'Doctor', 'Hospital'].map((role) => (
      <button
        key={role}
        onClick={() => setSelectedRole(role)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
          selectedRole === role
            ? 'bg-primary text-surface-foreground shadow-lg'
            : 'bg-muted text-muted-foreground hover:bg-muted'
        }`}
      >
        {role}
      </button>
    ))}
  </div>

  {/* Role Content */}
  <AnimatePresence mode="wait">
    {selectedRole === 'Patient' && (
      <Motion.div
        key="patient"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-surface p-6 rounded-xl shadow-xl border-l-4 border-green-400 text-left"
      >
        <h3 className="text-xl font-semibold text-success mb-4 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-success" /> Patient Flow
        </h3>
        <ul className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <Search className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Check <strong>Doctors</strong>, <strong>Hospitals</strong>, and <strong>Diagnostic Centers</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <Calendar className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Book a doctor as per need (fees, availability, specialization)</span>
          </li>
          <li className="flex items-start gap-2">
            <StethoscopeIcon className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Visit the doctor → Get consultation / prescriptions / tests</span>
          </li>
          <li className="flex items-start gap-2">
            <CreditCard className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Pay directly — 100% fee goes to the doctor via clinic</span>
          </li>
        </ul>
      </Motion.div>
    )}

    {selectedRole === 'Doctor' && (
      <Motion.div
        key="doctor"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-surface p-6 rounded-xl shadow-xl border-l-4 border-blue-400 text-left"
      >
        <h3 className="text-xl font-semibold text-info mb-4 flex items-center gap-2">
          <UserCog className="w-5 h-5 text-info" /> Doctor Flow
        </h3>
        <ul className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <ClipboardList className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Check schedule and clinic assignments</span>
          </li>
          <li className="flex items-start gap-2">
            <Hospital className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Visit assigned hospital/clinic</span>
          </li>
          <li className="flex items-start gap-2">
            <Microscope className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>See patients and give prescriptions/tests</span>
          </li>
          <li className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Receive consultation fees directly</span>
          </li>
        </ul>
      </Motion.div>
    )}

    {selectedRole === 'Hospital' && (
      <Motion.div
        key="hospital"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-surface p-6 rounded-xl shadow-xl border-l-4 border-purple-400 text-left"
      >
        <h3 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
          <Building2Icon className="w-5 h-5 text-accent" /> Hospital Flow
        </h3>
        <ul className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <CalendarClock className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Manage doctor schedules and hospital staff</span>
          </li>
          <li className="flex items-start gap-2">
            <TabletSmartphone className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Take appointments and assign doctors</span>
          </li>
          <li className="flex items-start gap-2">
            <FlaskConical className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Perform diagnostic tests and upload results</span>
          </li>
          <li className="flex items-start gap-2">
            <Wallet className="w-4 h-4 mt-1 text-muted-foreground" />
            <span>Receive payment and manage reports</span>
          </li>
        </ul>
      </Motion.div>
    )}
  </AnimatePresence>
</div>

{/* Description */}
      <div className="text-center pt-28 pl-6 pr-6 max-w-4xl mx-auto">
        <Motion.h1
          className="text-5xl font-bold text-primary mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            By the People<br />
          For the people
        </Motion.h1>
        <Motion.p
          className="text-lg text-muted-foreground mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
           You pay less. There is no commission or middle-men. Direct payment between Doctors, patients and Hospitals. 0% surge and 0% commission.
        </Motion.p>
      </div>

      {/* Features */}
      <div className="mt-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {features.map((feature, i) => (
            <Motion.div
  key={i}
  data-motion-card
  data-motion-interactive
  className="group relative overflow-hidden bg-muted p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-28"
>
  <div className="text-3xl mb-2">{feature.icon}</div>

  <p className="text-lg font-medium text-muted-foreground">
    {feature.label}
  </p>

<div
    className="
    absolute
    inset-x-0
    bottom-0

    translate-y-full
    group-hover:translate-y-0

    transition-transform
    duration-300

    bg-card/95
    backdrop-blur-md
    p-4
">
  <p className="mt-3 text-sm text-muted-foreground
                opacity-0 max-h-0 overflow-hidden
                transition-all duration-300
                group-hover:opacity-100
                group-hover:max-h-24">
    {feature.description}
  </p>
  <div className="text-xl mb-1">{feature.icon}</div>
  </div>
</Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
