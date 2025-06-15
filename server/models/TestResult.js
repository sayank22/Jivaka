const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  recommendedDoctor: { type: String, required: true },
  testName: { type: String, required: true },
  result: { type: String, required: true },
  fileUrl: { type: String }, // Optional
  uploadedBy: { type: String }, // Hospital name or email
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TestResult', testResultSchema);
