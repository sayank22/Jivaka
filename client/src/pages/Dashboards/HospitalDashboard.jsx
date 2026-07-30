import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { FaAngleDown } from 'react-icons/fa';
import axios from 'axios';
import PaymentPage from '../PaymentPage';
import { toast } from 'react-toastify';



const CollapsibleSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  

  return (
    <div className="mb-6">
      <div
        className="flex items-center justify-between cursor-pointer bg-surface p-3 rounded shadow"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-lg font-bold text-primary">{title}</h2>
        <FaAngleDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && <div className="mt-2 p-4 bg-card rounded shadow-inner">{children}</div>}
    </div>
  );
};

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [diagnosticAppointments, setDiagnosticAppointments] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [testResults, setTestResults] = useState([]);
  
const handlePaymentRedirect = () => {
  navigate('/payment'); // 👈 This will redirect to PaymentPage
};

const [formData, setFormData] = useState({
  patientName: '',
  recommendedDoctor: '',
  testName: '',
  result: '',
  file: null,
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleFileChange = (e) => {
  setFormData({ ...formData, file: e.target.files[0] });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = await getToken();
  const data = new FormData();

  for (const key in formData) {
    data.append(key, formData[key]);
  }

  try {
    await axios.post(`${import.meta.env.VITE_API_URL
}/api/test-results/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    toast.info("Test result uploaded!");
  } catch (error) {
    console.error("Upload failed:", error);
  }
};


  useEffect(() => {
    if (isLoaded && !user) navigate('/login/doctor');
  }, [user, isLoaded, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL
}/api/diagnostics/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDiagnosticAppointments(res.data);
      } catch (error) {
        console.error("Error fetching diagnostics:", error);
      }
    };

    fetchBookings();
  }, [getToken]);

  useEffect(() => {
  const fetchDoctorSlots = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL
}/api/hospital-slots`, {
  headers: { Authorization: `Bearer ${token}` },
});
      setDoctorSlots(res.data);
    } catch (error) {
      console.error("Error fetching doctor slots:", error);
    }
  };

  fetchDoctorSlots();
}, [getToken]);

useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = await getToken(); // Clerk token for auth
        const res = await axios.get(`${import.meta.env.VITE_API_URL
}/api/test-results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTestResults(res.data);
      } catch (err) {
        console.error("Failed to fetch test results:", err);
      }
    };

    fetchResults();
  }, [user]);


  if (!isLoaded || !user) return null;

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
      <h1 className="text-2xl text-center font-bold text-primary mb-6">
        Hospital - {user.fullName || user.primaryEmailAddress?.emailAddress}
      </h1>
      
<section className="mb-6 bg-card p-4 rounded shadow">
  <h2 className="text-xl font-semibold text-primary mb-2">Diagnostic Appointment</h2>
        {diagnosticAppointments.length === 0 ? (
          <p className="text-muted-foreground">No diagnostic appointments found.</p>
        ) : (
          diagnosticAppointments.map((booking) => (
            <div key={booking._id} className="border-b py-2">
              <p><strong>Patient:</strong> {booking.patientName}</p>
              <p><strong>Test:</strong> {booking.testName}</p>
              <p><strong>Center:</strong> {booking.center}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Slot #:</strong> {booking.slotNumber}</p>
              <p><strong>Price:</strong> ₹{booking.price}</p>
            </div>
          ))
        )}
      </section>
      
      <section className="mb-6 bg-card p-4 rounded shadow">
  <h2 className="text-xl font-semibold text-primary mb-2">Doctor's Schedule</h2>
  {doctorSlots.length === 0 ? (
    <p className="text-muted-foreground">No slots available</p>
  ) : (
    doctorSlots.map((slot, index) => (
      <div key={index} className="border-b py-2">
        <p><strong>Day:</strong> {slot.days}</p>
        <p><strong>Time:</strong> {slot.time}</p>
      </div>
    ))
  )}
</section>

<section className="mb-6 bg-card p-4 rounded shadow">
  <h2 className="text-xl font-semibold text-primary mb-2">Upload Test Results</h2>
  <form className="grid gap-3" onSubmit={handleSubmit}>
    <input
      type="text"
      name="patientName"
      placeholder="Patient Name"
      onChange={handleInputChange}
      className="p-2 border rounded"
    />
    <input
      type="text"
      name="recommendedDoctor"
      placeholder="Recommended Doctor"
      onChange={handleInputChange}
      className="p-2 border rounded"
    />
    <input
      type="text"
      name="testName"
      placeholder="Test Name"
      onChange={handleInputChange}
      className="p-2 border rounded"
    />
    <select
      name="result"
      onChange={handleInputChange}
      className="p-2 border rounded"
    >
      <option value="">Test Result</option>
      <option value="Positive">Positive</option>
      <option value="Negative">Negative</option>
    </select>
    {/* <input
      type="file"
      onChange={handleFileChange}
      className="p-2 border rounded"
    /> */}
    <button
      type="submit"
      className="bg-indigo-600 text-surface-foreground px-4 py-2 rounded hover:bg-indigo-700"
    >
      Upload
    </button>
  </form>
</section>

 <section className="mb-6 mt-10 px-4">
  <h2 className="text-2xl font-bold mb-6 text-muted-foreground">Uploaded Test Results</h2>

  {testResults.length === 0 ? (
    <p className="text-muted-foreground text-center text-lg">No test results uploaded yet.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testResults.map((result) => (
        <article
          key={result._id}
          className="bg-card p-4 shadow-sm rounded-xl border border-border transition hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-info">{result.testName}</h3>
          <p className="text-sm text-muted-foreground mt-1">👤 Patient: <strong>{result.patientName}</strong></p>
          <p className="text-sm text-muted-foreground">👨‍⚕️ Doctor: <strong>{result.recommendedDoctor}</strong></p>
          <p className="text-sm text-muted-foreground">📝 Result: <em>{result.result}</em></p>

          {result.fileUrl && (
            <a
              href={`${import.meta.env.VITE_API_URL
}${result.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-info underline mt-2 inline-block"
            >
              📄 View Report
            </a>
          )}

          <p className="text-xs text-muted-foreground mt-2">🏥 Uploaded by: {result.uploadedBy}</p>
          <p className="text-xs text-muted-foreground">🕒 {new Date(result.timestamp).toLocaleString()}</p>
        </article>
      ))}
    </div>
  )}
</section>


      <section className="mb-6 bg-card p-4 rounded shadow">
  <h2 className="text-xl font-semibold text-primary mb-2">Pay</h2>
  <form className="grid gap-3" onSubmit={handleSubmit}></form>
        <form className="grid gap-3">
          <input type="text" placeholder="Hospital Name" className="p-2 border rounded" />
          <input type="number" placeholder="Amount" className="p-2 border rounded" />
          <button onClick={handlePaymentRedirect} 
          className="bg-success text-surface-foreground px-4 py-2 rounded hover:bg-success">Pay To Jivaka</button>
        </form>
      </section>
      

<CollapsibleSection title="Patient Queue System">
        <div className="grid gap-3">
        <p>Next Patient: Ramesh Sinha (Token #12)</p>
        <p>Next Patient: Amitabh Bhattacharya (Token #13)</p>
      </div>
      </CollapsibleSection>

      <CollapsibleSection title="Appointment / Test Booking">
        <form className="grid gap-3">
          <input type="text" placeholder="Patient Name" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option>Select Doctor/Test</option>
            <option>Dr. Anita Roy</option>
            <option>CT Scan</option>
          </select>
          <input type="datetime-local" className="p-2 border rounded" />
          <button type="submit" className="bg-info text-surface-foreground px-4 py-2 rounded hover:bg-info">Book</button>
        </form>
      </CollapsibleSection>
      
      <CollapsibleSection title="Staff Directory">
        <div className="grid gap-3">
        <p>Reception: Meena Kumari</p>
        <p>Nurse: Rani Das</p>
      </div>
      </CollapsibleSection>

      <CollapsibleSection title="Room & Bed Availability">
        <div className="grid gap-3">
        <p>General Beds - Total: 20, Occupied: 14, Available: 6</p>
        <p>ICU Beds - Total: 10, Occupied: 7, Available: 3</p>
      </div>
      </CollapsibleSection>

      <CollapsibleSection title="Doctor List">
        {doctors.map((doc, i) => (
          <div key={i} className="mb-2 p-2 border rounded">
            <p><strong>{doc.specialization}:</strong> {doc.name}</p>
            <p>Fees: {doc.fees}</p>
            <p>Available: {doc.available}</p>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Diagnosis Tests">
        {tests.map((t, i) => (
          <div key={i} className="mb-2">
            <p>{t.name} - Fees: {t.fees}</p>
          </div>
        ))}
      </CollapsibleSection>


      <CollapsibleSection title="Reports & Analytics">
        <div className="grid gap-3">
          <p>Total Patients Today: 58</p>
          <p>Total Tests Today: 31</p>
          <p>Occupancy: 85%</p>
          <p>Weekly Visits: 245</p>
          <p>Monthly Visits: 910</p>
        </div>
      </CollapsibleSection>

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
