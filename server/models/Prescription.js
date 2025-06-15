const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  doctorEmail: String,
  patientName: String,
  symptoms: String,
  diagnosis: String,
  medicines: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
