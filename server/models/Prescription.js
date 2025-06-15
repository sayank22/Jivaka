const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  medicines: { type: String, required: true },
  date: { type: Date, default: Date.now } // Auto-filled
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
