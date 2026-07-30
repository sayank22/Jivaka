import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserMd, FaNotesMedical, FaCalendarAlt,
  FaChartBar, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  

  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    symptoms: '',
    diagnosis: '',
    medicines: ''
  });
  const [slotForm, setSlotForm] = useState({
  hospitalName: '',
  days: '',
  time: ''
});
const [slot, setSlot] = useState([]);

  const [showWeek, setShowWeek] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [showPatients, setShowPatients] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) navigate('/login');
  }, [user, isLoaded, navigate]);

 /* ───────── 1️⃣  Appointments + MyPrescriptions ───────── */
useEffect(() => {
  const fetchAllData = async () => {
    try {
      const [appointmentsRes, prescriptionsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/appointments`),
        getToken().then(token =>
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/prescriptions`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        ),
      ]);

      setAppointments(
        Array.isArray(appointmentsRes.data) ? appointmentsRes.data : []
      );
      setPrescriptions(
        Array.isArray(prescriptionsRes.data) ? prescriptionsRes.data : []
      );
    } catch (err) {
      console.error('Error fetching appointments / prescriptions:', err);
    }
  };

  if (user) fetchAllData();
}, [user, getToken]);

/* ───────── 2️⃣  Hospital slots (doctor‑specific) ───────── */
useEffect(() => {
  if (!user) return;

  axios
    .get(`${import.meta.env.VITE_API_URL}/api/hospital-slots`)
    .then(res => setSlot(res.data))
    .catch(err =>
      console.error('Error fetching hospital slots:', err)
    );
}, [user]);

/* ───────── 3️⃣  Test results (once on mount) ───────── */
useEffect(() => {
  const fetchTestResults = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/test-results`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTestResults(res.data);
    } catch (err) {
      console.error('Failed to fetch test results:', err);
    }
  };

  fetchTestResults();
}, [getToken]);


  const todayStr = new Date().toISOString().split('T')[0];

  const appointmentsToday = appointments.filter(app => app.date?.startsWith(todayStr));
  const appointmentsWeek = appointments.filter(app => {
    const today = new Date();
    const appDate = new Date(app.date);
    const diff = (appDate - today) / (1000 * 60 * 60 * 24);
    return diff >= 1 && diff <= 7;
  });
  const appointmentsMonth = appointments.filter(app => {
    const today = new Date();
    const appDate = new Date(app.date);
    return appDate.getMonth() === today.getMonth();
  });

  const filteredAppointments = appointments.filter(app =>
    app.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSlotChange = (e) => {
  setSlotForm({ ...slotForm, [e.target.name]: e.target.value });
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/prescriptions`, formData);
    toast.success('Prescription submitted!');
    setFormData({ patientName: '', symptoms: '', diagnosis: '', medicines: '' });

    // Refetch prescriptions after submission
    const token = await getToken();
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/prescriptions/myprescriptions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPrescriptions(res.data);

  } catch (err) {
    console.error(err);
  }
};

  const handleSlotSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${import.meta.env.VITE_API_URL
}/api/hospital-slots`, {
      ...slotForm,
      doctorEmail: user.primaryEmailAddress.emailAddress
    });
    toast.success('Slot submitted!');
    setSlotForm({ hospitalName: '', days: '', time: '' });

    // Refetch slot list
    const res = await axios.get(`${import.meta.env.VITE_API_URL
}/api/hospital-slots/${user.primaryEmailAddress.emailAddress}`);
    setSlot(res.data);
  } catch (err) {
    console.error('Error submitting slot:', err);

  }
};


  return (
    <div className="p-6 bg-gradient-to-tr from-green-100 to-blue-50 min-h-screen">

      <h1 className="text-2xl font-bold text-center text-primary mt-2 mb-6">
        Welcome, Dr. {user?.fullName || user?.primaryEmailAddress?.emailAddress}
      </h1>

      <Section title="Today's Appointments" icon={<FaCalendarAlt />}>
        <AppointmentList list={appointmentsToday} />
        <ToggleList label="Week's Appointments" show={showWeek} toggle={() => setShowWeek(!showWeek)} list={appointmentsWeek} color="green" />
        <ToggleList label="Month's Appointments" show={showMonth} toggle={() => setShowMonth(!showMonth)} list={appointmentsMonth} color="indigo" />
      </Section>

      <Section title="Write Prescription" icon={<FaNotesMedical />}>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="Patient Name" className="p-2 border rounded" required />
          <input type="text" name="symptoms" value={formData.symptoms} onChange={handleChange} placeholder="Symptoms" className="p-2 border rounded" required />
          <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} placeholder="Diagnosis" className="p-2 border rounded" required />
          <textarea name="medicines" value={formData.medicines} onChange={handleChange} placeholder="Medicines" className="p-2 border rounded" required></textarea>
          <button type="submit" className="bg-primary text-surface-foreground px-4 py-2 rounded hover:bg-primary">Submit</button>
        </form>
      </Section>

      <Section title="Prescriptions Given" icon={<FaNotesMedical />}>
        {prescriptions.length ? prescriptions.map((p, i) => (
          <div key={i} className="p-2 border mb-2 rounded bg-muted">
            <strong>{p.patientName}</strong><br />
            Symptoms: {p.symptoms}<br />
            Diagnosis: {p.diagnosis}<br />
            Medicines: {p.medicines}<br />
            Date: {new Date(p.date).toLocaleString()}
          </div>
        )) : <p>No prescriptions yet.</p>}
      </Section>

 <Section title="Give Slot to Hospital" icon={<FaNotesMedical />}>
  <form className="grid gap-3" onSubmit={handleSlotSubmit}>
    <input type="text" name="hospitalName" value={slotForm.hospitalName} onChange={handleSlotChange} placeholder="Hospital Name" className="p-2 border rounded" required />
    <input type="text" name="days" value={slotForm.days} onChange={handleSlotChange} placeholder="Days (e.g., Mon, Wed, Fri)" className="p-2 border rounded" required />
    <input type="text" name="time" value={slotForm.time} onChange={handleSlotChange} placeholder="Time (e.g., 10 AM - 2 PM)" className="p-2 border rounded" required />
    <button type="submit" className="bg-primary text-surface-foreground px-4 py-2 rounded hover:bg-primary">Submit</button>
  </form>
</Section>

      <Section title="Time-Slot for Hospital" icon={<FaNotesMedical />}>
  {slot.length ? slot.map((s, i) => (
    <div key={i} className="p-2 border mb-2 rounded bg-muted">
      <strong>{s.hospitalName}</strong><br />
      Days: {s.days}<br />
      Time: {s.time}<br />
    </div>
  )) : <p>No slot yet.</p>}
</Section>

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

      <Section title="Analytics" icon={<FaChartBar />}>
        <div className="flex gap-6">
          <AnalyticsCard label="Patients this week" count={appointmentsWeek.length} bgColor="green" />
          <AnalyticsCard label="Patients this month" count={appointmentsMonth.length} bgColor="blue" />
        </div>
      </Section>

      <Section title={
        <span className="flex items-center justify-between w-full">
          <span className="flex items-center gap-2"><FaUserMd /> All Appointments</span>
          <button onClick={() => setShowPatients(!showPatients)}>
            {showPatients ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </span>
      }>
        {showPatients && (
          <>
            <input
              type="text"
              placeholder="Search Patient..."
              className="p-2 border rounded mb-3 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AppointmentList list={filteredAppointments} />
          </>
        )}
      </Section>
    </div>
  );
};

const Section = ({ title, children, icon }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-3">
      {icon} {title}
    </h2>
    <div className="bg-card p-4 rounded shadow-md">{children}</div>
  </div>
);

const ToggleList = ({ label, show, toggle, list, color }) => (
  <div className="mt-4">
    <button onClick={toggle} className={`text-${color}-700 font-semibold flex items-center gap-1`}>
      {label} {show ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    {show && <AppointmentList list={list} />}
  </div>
);

const AppointmentList = ({ list }) => (
  <ul className="mt-2 space-y-2">
    {list.length > 0 ? list.map((a, i) => (
      <li key={i} className="p-2 bg-muted rounded shadow-sm">
        <strong>{a.patientName || 'Unknown'}</strong> - {a.reason} <br />
        <span className="text-sm text-muted-foreground">📅 {new Date(a.date).toLocaleString()} | 🏥 {a.hospital}</span>
      </li>
    )) : (
      <li className="text-muted-foreground">No appointments.</li>
    )}
  </ul>
);

const AnalyticsCard = ({ label, count, bgColor }) => (
  <div className={`bg-${bgColor}-100 px-4 py-2 rounded shadow`}>
    {label}: <strong>{count}</strong>
  </div>
);

export default DoctorDashboard;
