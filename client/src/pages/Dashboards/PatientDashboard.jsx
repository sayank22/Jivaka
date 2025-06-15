import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser, SignOutButton } from '@clerk/clerk-react'; 
import { FaHospitalAlt, FaUserMd, FaVials, FaPrescriptionBottle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentPage from '../PaymentPage';


const mockData = {
  specialists: [
    {
      type: 'General Physician',
      doctors: [{ _id: 'doc001', name: 'Dr. Anjali Mehra', fee: '₹400', time: '10am - 1pm', hospital: 'City Care Hospital' }],
    },
    {
      type: 'Cardiologist (Heart Specialist)',
      doctors: [{ _id: 'doc002', name: 'Dr. Sneha Rao', fee: '₹800', time: '9am - 12pm', hospital: 'HeartWell Center' }],
    },
    {
      type: 'Neurosurgeon',
      doctors: [{ _id: 'doc003', name: 'Dr. Mehul Desai', fee: '₹1500', time: '11am - 2pm', hospital: 'Neuroscience Hospital' }],
    },
    {
      type: 'Orthopedic Surgeon',
      doctors: [{ _id: 'doc004', name: 'Dr. Alok Singh', fee: '₹1200', time: '10am - 12pm', hospital: 'Bone & Joint Clinic' }],
    },
    {
      type: 'Urologist',
      doctors: [{ _id: 'doc005', name: 'Dr. Kavita Gupta', fee: '₹1100', time: '2pm - 4pm', hospital: 'UroHealth Hospital' }],
    },
    {
      type: 'ENT Specialist',
      doctors: [{ _id: 'doc006', name: 'Dr. Ramesh Kulkarni', fee: '₹700', time: '3pm - 6pm', hospital: 'City ENT Clinic' }],
    },
    {
      type: 'Dermatologist',
      doctors: [{ _id: 'doc007', name: 'Dr. Priya Malhotra', fee: '₹600', time: '11am - 1pm', hospital: 'SkinCare Center' }],
    },
    {
      type: 'Gynecologist',
      doctors: [{ _id: 'doc008', name: 'Dr. Sunita Verma', fee: '₹900', time: '4pm - 6pm', hospital: 'Mother & Child Clinic' }],
    },
    {
      type: 'Oncologist',
      doctors: [{ _id: 'doc009', name: 'Dr. Vikram Sen', fee: '₹1600', time: '9am - 11am', hospital: 'Cancer Care Hospital' }],
    },
  ],
  diagnostics: [
    {
      center: 'City Diagnostics',
      tests: [
        { _id: 'test001', name: 'Blood Test', price: '₹250' },
        { _id: 'test002', name: 'X-Ray', price: '₹500' },
        { _id: 'test003', name: 'MRI Scan', price: '₹4000' },
      ],
    },
    {
      center: 'Health Lab',
      tests: [
        { _id: 'test004', name: 'ECG', price: '₹800' },
        { _id: 'test005', name: 'Liver Function Test', price: '₹1200' },
      ],
    },
    {
      center: 'Green Cross Lab',
      tests: [
        { _id: 'test006', name: 'CT Scan', price: '₹3500' },
        { _id: 'test007', name: 'Ultrasound (USG)', price: '₹700' },
        { _id: 'test008', name: 'Thyroid Test', price: '₹400' },
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
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
const [selectedDoctor, setSelectedDoctor] = useState(null); 
const [selectedTest, setSelectedTest] = useState(null);
const [showTestModal, setShowTestModal] = useState(false);
const [showModal, setShowModal] = useState(false);
const [prescriptions, setPrescriptions] = useState([]);
const [testResults, setTestResults] = useState([]);
const handlePaymentRedirect = () => {
  navigate('/payment'); // 👈 This will redirect to PaymentPage
};


  useEffect(() => {
    if (isLoaded && !user) navigate('/login/patient');
   }, [user, isLoaded, navigate]);

  useEffect(() => {
  const fetchPrescriptions = async () => {
    if (user) {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/prescriptions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescriptions(res.data);
      } catch (error) {
        // You can optionally handle UI error state here
      }
    }
  };

  fetchPrescriptions();
}, [user, getToken]);

useEffect(() => {
  const fetchTestResults = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/test-results`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTestResults(res.data);
    } catch (err) {
      console.error('Failed to fetch test results:', err);
    }
  };

  fetchTestResults();
}, []);


  if (!isLoaded || !user) return null;

  return (
    <div className="p-6 bg-gradient-to-tr from-blue-100 to-purple-200 min-h-screen">
       <h1 className=" mb-6 text-3xl font-bold text-teal-800">
            Welcome, {user?.fullName || user?.primaryEmailAddress?.emailAddress}
          </h1>
      
      <Section title="Doctor Specializations" icon={<FaUserMd />}> 
      {showModal && selectedDoctor && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
      <h2 className="text-xl font-bold mb-4 text-teal-700">Book Appointment</h2>
      <button
        className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
        onClick={() => setShowModal(false)}
      >
        &times;
      </button>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const token = await getToken();
            await axios.post(
              `${import.meta.env.VITE_API_URL
}/api/appointments/book`,
              {
                patientName: user.fullName,
                patientEmail: user.primaryEmailAddress.emailAddress,
                doctorName: selectedDoctor.name,
                specialization: selectedDoctor.specialization,
                hospital: selectedDoctor.hospital,
                fee: selectedDoctor.fee,
                date: e.target.date.value,
                reason: e.target.notes.value,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            alert("Appointment booked successfully!");
            setShowModal(false);
          } catch (err) {
            console.error(err);
            alert("Failed to book appointment.");
          }
        }}
        className="space-y-4"
      >
        <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
        <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
        <p><strong>Hospital:</strong> {selectedDoctor.hospital}</p>
        <p><strong>Fee:</strong> {selectedDoctor.fee}</p>

        <label className="block">
          Date:
          <input
            type="date"
            name="date"
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          Notes:
          <textarea
            name="notes"
            rows="3"
            className="w-full mt-1 p-2 border rounded"
            placeholder="Symptoms or concern"
          />
        </label>

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  </div>
)}
        <ToggleList
          items={mockData.specialists}
          renderTitle={(spec) => spec.type}
          renderDetails={(spec) => (
            <div className="grid sm:grid-cols-2 gap-3">
              {spec.doctors.map((doc, i) => (
                <div key={i} className="bg-purple-300 p-3 rounded-lg shadow-inner hover:shadow-md hover:scale-[1.01] transition">
                  <p className="font-semibold text-teal-800">{doc.name}</p>
                  <p className="text-sm">Fee: <span className="text-gray-600">{doc.fee}</span></p>
                  <p className="text-sm">Time: {doc.time}</p>
                  <p className="text-sm">Hospital: {doc.hospital}</p>
                   <button
  onClick={() => {
    setSelectedDoctor({
      name: doc.name,
      specialization: spec.type,
      hospital: doc.hospital,
      fee: doc.fee,
    });
     setShowModal(true)
  }}
  className="mt-2 inline-block bg-teal-600 text-white px-3 py-1 rounded-full text-sm hover:bg-teal-700"
>
  Book Appointment
</button>
                </div>
              ))}
            </div>
          )}
        />
      </Section>

      <Section title="Diagnostic Centers" icon={<FaVials />}> 
      {showTestModal && selectedTest && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
      <h2 className="text-xl font-bold mb-4 text-teal-700">Book Diagnostic Test</h2>
      <button
        className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
        onClick={() => setShowTestModal(false)}
      >
        &times;
      </button>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const token = await getToken();
            await axios.post(
              `${import.meta.env.VITE_API_URL
}/api/diagnostics/book`,
              {
                patientName: user.fullName,
                patientEmail: user.primaryEmailAddress.emailAddress,
                testName: selectedTest.name,
                center: selectedTest.center,
                price: selectedTest.price,
                date: e.target.date.value,
                notes: e.target.notes.value,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            alert("Diagnostic Test booked successfully!");
            setShowTestModal(false);
          } catch (err) {
            console.error(err);
            alert("Failed to book test.");
          }
        }}
        className="space-y-4"
      >
        <p><strong>Test:</strong> {selectedTest.name}</p>
        <p><strong>Center:</strong> {selectedTest.center}</p>
        <p><strong>Price:</strong> {selectedTest.price}</p>

        <label className="block">
          Date:
          <input
            type="date"
            name="date"
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  </div>
)}
        <ToggleList
          items={mockData.diagnostics}
          renderTitle={(diag) => diag.center}
          renderDetails={(diag) => (
            <div className="grid gap-3">
              {diag.tests.map((test, i) => (
                <div key={i} className="bg-purple-50 p-3 rounded-lg hover:shadow-md transition">
                  <p className="font-semibold">{test.name}</p>
                  <p className="text-sm text-gray-700">Price: {test.price}</p>
                   <button
  onClick={() => {
  setSelectedTest({
    name: test.name,
    price: test.price,
    center: diag.center,
  });
  setShowTestModal(true);
}}
  className="mt-2 inline-block bg-teal-600 text-white px-3 py-1 rounded-full text-sm hover:bg-teal-700"
>
  Book Appointment
</button>
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

    {/* ✅ Prescriptions Section */}
      <Section title="Your Prescriptions" icon={<FaPrescriptionBottle />}>
        {prescriptions.length === 0 ? (
          <p className="text-gray-600">No prescriptions yet.</p>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((pres, i) => (
              <div key={i} className="bg-white border border-teal-200 rounded-lg p-4 shadow hover:shadow-md transition">
                <p><strong>Date:</strong> {new Date(pres.date).toLocaleDateString()}</p>
                <p><strong>Symptoms:</strong> {pres.symptoms}</p>
                <p><strong>Diagnosis:</strong> {pres.diagnosis}</p>
                <p><strong>Medicines:</strong> {pres.medicines}</p>
              </div>
            ))}
          </div>
        )}
      </Section>
<section className="mb-6 mt-10 px-4">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Uploaded Test Results</h2>

  {testResults.length === 0 ? (
    <p className="text-gray-600 text-center text-lg">No test results uploaded yet.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testResults.map((result) => (
        <article
          key={result._id}
          className="bg-white p-4 shadow-sm rounded-xl border border-gray-200 transition hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-blue-800">{result.testName}</h3>
          <p className="text-sm text-gray-700 mt-1">👤 Patient: <strong>{result.patientName}</strong></p>
          <p className="text-sm text-gray-700">👨‍⚕️ Doctor: <strong>{result.recommendedDoctor}</strong></p>
          <p className="text-sm text-gray-700">📝 Result: <em>{result.result}</em></p>

          {result.fileUrl && (
            <a
              href={`${import.meta.env.VITE_API_URL
}${result.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 inline-block"
            >
              📄 View Report
            </a>
          )}

          <p className="text-xs text-gray-500 mt-2">🏥 Uploaded by: {result.uploadedBy}</p>
          <p className="text-xs text-gray-500">🕒 {new Date(result.timestamp).toLocaleString()}</p>
        </article>
      ))}
    </div>
  )}
</section>

<section className="mb-6 bg-white p-4 rounded shadow">
  <h2 className="text-xl font-semibold text-teal-700 mb-2">Payment for Hospital</h2>
  <form className="grid gap-3" onSubmit={handlePaymentRedirect}></form>
        <form className="grid gap-3">
          <input type="text" placeholder="Hospital Name" className="p-2 border rounded" />
          <input type="number" placeholder="Amount" className="p-2 border rounded" />
          <button onClick={handlePaymentRedirect} 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Pay To hospital</button>
        </form>
      </section>

      <section className="mb-6 bg-white p-4 rounded shadow">
  <h2 className="text-xl font-semibold text-teal-700 mb-2">Payment for Doctor</h2>
  <form className="grid gap-3" onSubmit={handlePaymentRedirect}></form>
        <form className="grid gap-3">
          <input type="text" placeholder="Doctor Name" className="p-2 border rounded" />
          <input type="number" placeholder="Amount" className="p-2 border rounded" />
          <button onClick={handlePaymentRedirect} 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Pay To Doctor</button>
        </form>
      </section>

    </div>
  );
};

export default PatientDashboard;
