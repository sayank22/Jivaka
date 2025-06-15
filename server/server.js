require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');
const diagnosticBookingRoutes = require('./routes/diagnostic');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const hospitalSlotRoutes = require('./routes/hospitalSlotsRoutes');
const testResultRoutes = require('./routes/testResultRoutes');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use the MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error', err));

app.use('/api/appointments', appointmentRoutes);

app.use("/api/diagnostics", diagnosticBookingRoutes);

app.use('/api/prescriptions', prescriptionRoutes);

app.use('/api/hospital-slots', hospitalSlotRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/test-results', testResultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
