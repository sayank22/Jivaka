import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FaUserMd, FaNotesMedical, FaCalendarAlt, FaFlask, FaChartBar, FaShareAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import logoImage from '../../assets/logo.png';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const user = getAuth().currentUser;

  useEffect(() => {
    if (!user) navigate('/login/doctor');
  }, [user, navigate]);

  const [showWeek, setShowWeek] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [showPatients, setShowPatients] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) return null;

  const patients = [
    {
      name: 'Amit Sinha',
      problem: 'Fever and cold',
      prescription: 'Paracetamol 500mg, Cough Syrup',
      lastVisit: '2025-05-10 11:00 AM',
      nextVisit: '2025-05-17 10:00 AM',
      location: 'Apollo Hospital'
    },
    {
      name: 'Sita Das',
      problem: 'High blood pressure',
      prescription: 'Amlodipine 5mg',
      lastVisit: '2025-05-12 1:00 PM',
      nextVisit: '2025-05-19 12:00 PM',
      location: 'Health Lab Diagnostic Center'
    },
  ];

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const appointmentsToday = [
    { location: 'Fortis Hospital', time: '11:00 AM - 1:30 PM' },
    { location: 'City Diagnostics', time: '6:00 PM - 9PM' },
  ];

  const appointmentsWeek = [
    { location: 'Apollo Hospital', time: 'Tuesday, 10:00 AM - 12:00 PM' },
    { location: 'Health Lab', time: 'Thursday, 2:00 PM - 4:00 PM' },
    { location: 'Fortis Hospital', time: 'Saturday, 11:00 AM - 1:00 PM' },
  ];

  const appointmentsMonth = [
    { location: 'Fortis Hospital', time: '2025-05-20, 11:00 AM - 1:00 PM' },
    { location: 'City Diagnostics', time: '2025-05-28, 3:00 PM - 6:00 PM' },
    { location: 'Apollo Hospital', time: '2025-05-22, 2:00 PM - 4:00 PM' },
    { location: 'Health Lab', time: '2025-05-25, 10:00 AM - 12:00 PM' },
  ];

  const testResults = [
    {
      patient: 'Amit Sinha',
      test: 'Blood Test',
      result: 'Normal',
      from: 'Health Lab'
    },
    {
      patient: 'Sita Das',
      test: 'ECG',
      result: 'Minor irregularity',
      from: 'City Diagnostics'
    },
  ];

  const analytics = {
    thisWeek: 14,
    thisMonth: 56,
  };

  return (
    <div className="p-6 bg-gradient-to-tr from-gray-100 to-blue-50 min-h-screen">
      <div className="flex justify-center">
        <img src={logoImage} alt="Jivaka Logo" className="w-24 h-24 object-contain" />
      </div>
      <h1 className="text-2xl font-bold text-center text-teal-800 mt-2 mb-6">Welcome, Dr.{user.displayName || user.email}</h1>

      {/* Today's Appointments */}
      <Section title="Today's Appointments" icon={<FaCalendarAlt />}>
        <ul className="space-y-2">
          {appointmentsToday.map((a, i) => (
            <li key={i} className="p-2 bg-gray-100 rounded shadow-sm">{a.location} at {a.time}</li>
          ))}
        </ul>
        <div className="mt-4">
          <button onClick={() => setShowWeek(!showWeek)} className="text-green-700 font-semibold flex items-center gap-1">
            Week's Appointments {showWeek ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {showWeek && (
            <ul className="mt-2 space-y-2">
              {appointmentsWeek.map((a, i) => (
                <li key={i} className="p-2 bg-green-50 rounded shadow-sm">{a.location} at {a.time}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4">
          <button onClick={() => setShowMonth(!showMonth)} className="text-indigo-700 font-semibold flex items-center gap-1">
            Month's Appointments {showMonth ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {showMonth && (
            <ul className="mt-2 space-y-2">
              {appointmentsMonth.map((a, i) => (
                <li key={i} className="p-2 bg-indigo-50 rounded shadow-sm">{a.location} at {a.time}</li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* Prescription Panel */}
      <Section title="Write Prescription" icon={<FaNotesMedical />}>
        <form className="grid gap-3">
          <input type="text" placeholder="Patient Name" className="p-2 border rounded" />
          <input type="text" placeholder="Symptoms" className="p-2 border rounded" />
          <input type="text" placeholder="Diagnosis" className="p-2 border rounded" />
          <textarea placeholder="Medicines" className="p-2 border rounded"></textarea>
          <div className="flex gap-3">
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Submit</button>
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Print</button>
          </div>
        </form>
      </Section>

      {/* Test Results */}
      <Section title="Test Results Review" icon={<FaFlask />}>
        <div className="grid gap-4">
          {testResults.map((t, i) => (
            <div key={i} className="bg-white p-3 rounded shadow">
              <p><strong>{t.patient}</strong> — {t.test} from {t.from}: <em>{t.result}</em></p>
            </div>
          ))}
        </div>
      </Section>

      {/* Analytics */}
      <Section title="Analytics" icon={<FaChartBar />}>
        <div className="flex gap-6">
          <div className="bg-green-100 px-4 py-2 rounded shadow">Patients this week: <strong>{analytics.thisWeek}</strong></div>
          <div className="bg-blue-100 px-4 py-2 rounded shadow">Patients this month: <strong>{analytics.thisMonth}</strong></div>
        </div>
      </Section>

      {/* Referral System */}
      <Section title="Referral System" icon={<FaShareAlt />}>
        <form className="grid gap-3">
          <input type="text" placeholder="Patient Name" className="p-2 border rounded" />
          <input type="text" placeholder="Referred To (Doctor/Specialist)" className="p-2 border rounded" />
          <textarea placeholder="Reason for referral" className="p-2 border rounded"></textarea>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Refer</button>
        </form>
      </Section>

      {/* Patient List */}
      <Section title={<span className="flex items-center justify-between w-full">
        <span className="flex items-center gap-2"><FaUserMd /> Patient List</span>
        <button onClick={() => setShowPatients(!showPatients)}>
          {showPatients ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </span>}>
        {showPatients && (
          <>
            <input
              type="text"
              placeholder="Search Patient..."
              className="p-2 border rounded mb-3 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {filteredPatients.map((p, idx) => (
                <div key={idx} className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p>Problem: {p.problem}</p>
                  <p>Prescription: {p.prescription}</p>
                  <p>Last Visit: {p.lastVisit}</p>
                  <p>Next Visit: {p.nextVisit}</p>
                  <p>Location: {p.location}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </Section>
    </div>
  );
};

const Section = ({ title, children, icon }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-teal-700 flex items-center gap-2 mb-3">
      {icon} {title}
    </h2>
    <div className="bg-white p-4 rounded shadow-md">{children}</div>
  </div>
);

export default DoctorDashboard;