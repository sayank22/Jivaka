import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FaHospitalAlt, FaUserMd, FaVials, FaFileMedical } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../../assets/logo.png';

const mockData = {
  specialists: [
    {
      type: 'General Physician',
      doctors: [{ name: 'Dr. Anjali Mehra', fee: '₹400', time: '10am - 1pm', hospital: 'City Care Hospital' }],
    },
    {
      type: 'Cardiologist (Heart Specialist)',
      doctors: [{ name: 'Dr. Sneha Rao', fee: '₹800', time: '9am - 12pm', hospital: 'HeartWell Center' }],
    },
    {
      type: 'Neurosurgeon',
      doctors: [{ name: 'Dr. Mehul Desai', fee: '₹1500', time: '11am - 2pm', hospital: 'Neuroscience Hospital' }],
    },
    {
      type: 'Orthopedic Surgeon',
      doctors: [{ name: 'Dr. Alok Singh', fee: '₹1200', time: '10am - 12pm', hospital: 'Bone & Joint Clinic' }],
    },
    {
      type: 'Urologist',
      doctors: [{ name: 'Dr. Kavita Gupta', fee: '₹1100', time: '2pm - 4pm', hospital: 'UroHealth Hospital' }],
    },
    {
      type: 'ENT Specialist',
      doctors: [{ name: 'Dr. Ramesh Kulkarni', fee: '₹700', time: '3pm - 6pm', hospital: 'City ENT Clinic' }],
    },
    {
      type: 'Dermatologist',
      doctors: [{ name: 'Dr. Priya Malhotra', fee: '₹600', time: '11am - 1pm', hospital: 'SkinCare Center' }],
    },
    {
      type: 'Gynecologist',
      doctors: [{ name: 'Dr. Sunita Verma', fee: '₹900', time: '4pm - 6pm', hospital: 'Mother & Child Clinic' }],
    },
    {
      type: 'Oncologist',
      doctors: [{ name: 'Dr. Vikram Sen', fee: '₹1600', time: '9am - 11am', hospital: 'Cancer Care Hospital' }],
    },
  ],
  diagnostics: [
    {
      center: 'City Diagnostics',
      tests: [
        { name: 'Blood Test', price: '₹250' },
        { name: 'X-Ray', price: '₹500' },
        { name: 'MRI Scan', price: '₹4000' },
      ],
    },
    {
      center: 'Health Lab',
      tests: [
        { name: 'ECG', price: '₹800' },
        { name: 'Liver Function Test', price: '₹1200' },
      ],
    },
    {
      center: 'Green Cross Lab',
      tests: [
        { name: 'CT Scan', price: '₹3500' },
        { name: 'Ultrasound (USG)', price: '₹700' },
        { name: 'Thyroid Test', price: '₹400' },
      ],
    },
  ],
  hospitals: [
    {
      name: 'Apollo Hospital',
      address: 'Kolkata, Sector 5',
      doctors: [
        { name: 'Dr. Sneha Rao', specialization: 'Cardiologist', time: '9am - 12pm' },
        { name: 'Dr. Mehul Desai', specialization: 'Neurosurgeon', time: '11am - 2pm' },
      ],
    },
    {
      name: 'Fortis Hospital',
      address: 'Kolkata, Salt Lake',
      doctors: [
        { name: 'Dr. Anjali Mehra', specialization: 'General Physician', time: '10am - 1pm' },
      ],
    },
    {
      name: 'Medica Superspecialty Hospital',
      address: 'Kolkata, Mukundapur',
      doctors: [
        { name: 'Dr. Amit Banerjee', specialization: 'Orthopedic', time: '10am - 1pm' },
        { name: 'Dr. Nidhi Basu', specialization: 'Gynecologist', time: '2pm - 5pm' },
        { name: 'Dr. Abhay Verma', specialization: 'Dermatologist', time: '5pm - 8pm' },
      ],
    },
  ],
  prescriptions: [
    { date: '2025-05-12', doctor: 'Dr. Sneha Rao', medicines: ['Aspirin', 'Metoprolol'] },
    { date: '2025-04-25', doctor: 'Dr. Rajiv Sharma', medicines: ['Paracetamol', 'Antacid'] },
  ],
};

const Section = ({ title, icon, children }) => (
  <div className="mb-10">
    <div className="flex items-center mb-4">
      {icon && <span className="text-teal-600 text-2xl mr-2">{icon}</span>}
      <h2 className="text-xl font-semibold text-teal-800">{title}</h2>
    </div>
    <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100">
      {children}
    </div>
  </div>
);

const ToggleList = ({ items, renderTitle, renderDetails }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="cursor-pointer border border-teal-300 rounded-lg p-3 bg-white shadow hover:bg-teal-50 transition"
        >
          <div
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="font-medium text-lg text-teal-700 flex justify-between items-center"
          >
            {renderTitle(item)}
            <span>{openIndex === idx ? '▲' : '▼'}</span>
          </div>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-2 text-gray-700 text-sm"
              >
                {renderDetails(item)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const PatientDashboard = () => {
  const navigate = useNavigate();
  const user = getAuth().currentUser;

  useEffect(() => {
    if (!user) navigate('/login/patient');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="p-6 bg-gradient-to-tr from-blue-100 to-purple-200 min-h-screen">
      <div className="text-center mb-8">
        <img
          src={logoImage}
          alt="Jivaka Logo"
          className="mx-auto top-6 left-6 w-20 h-20 shadow-lg rounded-full"
        />
        <h1 className="mx-auto text-3xl font-bold text-teal-800 mt-3">
          Welcome, {user.displayName || user.email}
        </h1>
      </div>

      <Section title="Doctor Specializations" icon={<FaUserMd />}> 
        <ToggleList
          items={mockData.specialists}
          renderTitle={(spec) => spec.type}
          renderDetails={(spec) => (
            <div className="grid sm:grid-cols-2 gap-3">
              {spec.doctors.map((doc, i) => (
                <div key={i} className="bg-teal-50 p-3 rounded-lg shadow-inner hover:shadow-md hover:scale-[1.01] transition">
                  <p className="font-semibold text-teal-800">{doc.name}</p>
                  <p className="text-sm">Fee: <span className="text-gray-600">{doc.fee}</span></p>
                  <p className="text-sm">Time: {doc.time}</p>
                  <p className="text-sm">Hospital: {doc.hospital}</p>
                </div>
              ))}
            </div>
          )}
        />
      </Section>

      <Section title="Diagnostic Centers" icon={<FaVials />}> 
        <ToggleList
          items={mockData.diagnostics}
          renderTitle={(diag) => diag.center}
          renderDetails={(diag) => (
            <div className="grid gap-3">
              {diag.tests.map((test, i) => (
                <div key={i} className="bg-purple-50 p-3 rounded-lg hover:shadow-md transition">
                  <p className="font-semibold">{test.name}</p>
                  <p className="text-sm text-gray-700">Price: {test.price}</p>
                </div>
              ))}
            </div>
          )}
        />
      </Section>

      <Section title="Hospitals" icon={<FaHospitalAlt />}> 
        <ToggleList
          items={mockData.hospitals}
          renderTitle={(hos) => hos.name + ' — ' + hos.address}
          renderDetails={(hos) => (
            <div className="space-y-2">
              {hos.doctors.map((doc, i) => (
                <div key={i} className="bg-green-50 p-3 rounded-lg hover:shadow-md transition">
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm">Specialization: {doc.specialization}</p>
                  <p className="text-sm">Time: {doc.time}</p>
                </div>
              ))}
            </div>
          )}
        />
      </Section>

      <Section title="Prescription History" icon={<FaFileMedical />}> 
        <div className="grid gap-3">
          {mockData.prescriptions.map((presc, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow hover:shadow-md transition">
              <p className="font-semibold text-gray-800">{presc.date} — {presc.doctor}</p>
              <p className="text-sm text-gray-600">Medicines: {presc.medicines.join(', ')}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default PatientDashboard;
