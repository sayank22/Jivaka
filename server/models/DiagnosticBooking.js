const mongoose = require("mongoose");

const diagnosticBookingSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  testName: { type: String, required: true },
  center: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  slotNumber: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DiagnosticBooking", diagnosticBookingSchema);
