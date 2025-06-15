const mongoose = require('mongoose');

const hospitalSlotSchema = new mongoose.Schema({
  doctorEmail: { type: String, required: true },
  hospitalName: { type: String, required: true },
  days: { type: String, required: true },
  time: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('HospitalSlot', hospitalSlotSchema);
