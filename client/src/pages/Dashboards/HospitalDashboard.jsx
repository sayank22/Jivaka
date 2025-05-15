import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FaAngleDown } from 'react-icons/fa';
import logoImage from '../../assets/logo.png';

const CollapsibleSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <div
        className="flex items-center justify-between cursor-pointer bg-teal-100 p-3 rounded shadow"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-lg font-bold text-teal-800">{title}</h2>
        <FaAngleDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && <div className="mt-2 p-4 bg-white rounded shadow-inner">{children}</div>}
    </div>
  );
};

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const user = getAuth().currentUser;

  useEffect(() => {
    if (!user) navigate('/login/hospital');
  }, [user, navigate]);

  if (!user) return null;

  const doctors = [
    { name: 'Dr. Rakesh Sharma', specialization: 'General Physician', fees: '₹300', available: 'Mon, Wed - 10 AM to 1 PM' },
    { name: 'Dr. Anita Roy', specialization: 'Cardiologist', fees: '₹600', available: 'Tue, Thu - 2 PM to 5 PM' },
    { name: 'Dr. Rajeev Mehta', specialization: 'Neurologist', fees: '₹700', available: 'Fri - 10 AM to 2 PM' },
    { name: 'Dr. Neha Verma', specialization: 'Orthopedic', fees: '₹500', available: 'Mon, Sat - 4 PM to 6 PM' },
    { name: 'Dr. Sushil Das', specialization: 'Urologist', fees: '₹550', available: 'Wed - 3 PM to 6 PM' },
    { name: 'Dr. Amrita Sinha', specialization: 'ENT', fees: '₹350', available: 'Thu - 10 AM to 1 PM' },
    { name: 'Dr. Reema Bose', specialization: 'Dermatologist', fees: '₹400', available: 'Mon, Fri - 12 PM to 3 PM' },
    { name: 'Dr. Lata Iyer', specialization: 'Gynecology', fees: '₹450', available: 'Sat - 10 AM to 1 PM' },
    { name: 'Dr. Arjun Pal', specialization: 'Oncology', fees: '₹900', available: 'Tue - 11 AM to 2 PM' },
  ];

  const tests = [
    { name: 'Blood Test', fees: '₹150' },
    { name: 'MRI', fees: '₹2500' },
    { name: 'CT Scan', fees: '₹1800' },
    { name: 'X-ray', fees: '₹300' },
    { name: 'Biopsy', fees: '₹1200' },
    { name: 'Endoscopy', fees: '₹1000' },
    { name: 'USG', fees: '₹700' },
    { name: 'ECG', fees: '₹350' },
    { name: 'Vision Test', fees: '₹200' },
    { name: 'Urine Test', fees: '₹100' },
    { name: 'DNA Test', fees: '₹5000' },
    { name: 'Thyroid Test', fees: '₹450' },
    { name: 'Blood Pressure', fees: '₹50' },
    { name: 'Sodium Potassium Test', fees: '₹250' },
  ];

  const patientRecords = [
    { name: 'Rita Paul', age: 34, visits: 3, lastVisit: '2025-05-10', diagnosis: 'Diabetes' },
    { name: 'Ajay Dey', age: 45, visits: 2, lastVisit: '2025-05-12', diagnosis: 'Hypertension' },
  ];

  return (
    <div className="p-6 bg-gradient-to-tr from-gray-50 to-blue-100 min-h-screen">
      <img src={logoImage} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
      <h1 className="text-2xl text-center font-bold text-teal-800 mb-6">Welcome, {user.displayName || user.email}</h1>

      {/* Schedule */}
      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-teal-700 mb-2">Today's Schedule</h2>
        <p>Dr. Anita Roy - Cardiology - 11:00 AM</p>
        <p>CT Scan - 2:30 PM</p>
      </section>

      {/* Booking */}
      <CollapsibleSection title="Appointment / Test Booking">
        <form className="grid gap-3">
          <input type="text" placeholder="Patient Name" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option>Select Doctor/Test</option>
            <option>Dr. Anita Roy</option>
            <option>CT Scan</option>
          </select>
          <input type="datetime-local" className="p-2 border rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book</button>
        </form>
      </CollapsibleSection>

      {/* Billing */}
      <CollapsibleSection title="Billing & Invoice Generator">
        <form className="grid gap-3">
          <input type="text" placeholder="Patient Name" className="p-2 border rounded" />
          <input type="number" placeholder="Amount" className="p-2 border rounded" />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Generate Invoice</button>
        </form>
      </CollapsibleSection>

      {/* Patient Queue */}
      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-teal-700 mb-2">Patient Queue System</h2>
        <p>Next Patient: Ramesh Sinha (Token #12)</p>
      </section>

      {/* Staff Directory */}
      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-teal-700 mb-2">Staff Directory</h2>
        <ul className="list-disc pl-5">
          <li>Reception: Meena Kumari</li>
          <li>Nurse: Rani Das</li>
        </ul>
      </section>

      {/* Room and Bed Availability */}
      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-teal-700 mb-2">Room & Bed Availability</h2>
        <p>General Beds - Total: 20, Occupied: 14, Available: 6</p>
        <p>ICU Beds - Total: 10, Occupied: 7, Available: 3</p>
      </section>

      {/* Doctor List */}
      <CollapsibleSection title="Doctor List">
        {doctors.map((doc, i) => (
          <div key={i} className="mb-2 p-2 border rounded">
            <p><strong>{doc.specialization}:</strong> {doc.name}</p>
            <p>Fees: {doc.fees}</p>
            <p>Available: {doc.available}</p>
          </div>
        ))}
      </CollapsibleSection>

      {/* Diagnosis Tests */}
      <CollapsibleSection title="Diagnosis Tests">
        {tests.map((t, i) => (
          <div key={i} className="mb-2">
            <p>{t.name} - Fees: {t.fees}</p>
          </div>
        ))}
      </CollapsibleSection>

      {/* Upload Results */}
      <CollapsibleSection title="Upload Results">
        <form className="grid gap-3">
          <input type="text" placeholder="Patient Name" className="p-2 border rounded" />
          <input type="text" placeholder="Recommended Doctor" className="p-2 border rounded" />
          <input type="file" className="p-2 border rounded" />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Upload</button>
        </form>
      </CollapsibleSection>

      {/* Reports & Analytics */}
      <CollapsibleSection title="Reports & Analytics">
        <div className="grid gap-3">
          <p>Total Patients Today: 58</p>
          <p>Total Tests Today: 31</p>
          <p>Occupancy: 85%</p>
          <p>Weekly Visits: 245</p>
          <p>Monthly Visits: 910</p>
        </div>
      </CollapsibleSection>

      {/* Patient Record Access */}
      <CollapsibleSection title="Patient Record Access">
        <input type="text" placeholder="Search by name..." className="mb-3 p-2 border rounded w-full" />
        {patientRecords.map((p, i) => (
          <div key={i} className="border-b py-2">
            <p><strong>{p.name}</strong> - Age: {p.age}, Visits: {p.visits}</p>
            <p>Last Visit: {p.lastVisit}</p>
            <p>Diagnosis: {p.diagnosis}</p>
          </div>
        ))}
      </CollapsibleSection>
    </div>
  );
};

export default HospitalDashboard;
