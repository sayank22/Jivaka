const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  patientEmail: String,
  doctorName: String,
  specialization: String,
  hospital: String,
  fee: String,
  date: Date,
  slot: Number, // changed from string
  reason: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
