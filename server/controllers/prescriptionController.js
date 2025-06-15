const Prescription = require('../models/Prescription');

// GET /api/prescriptions/doctor/:email
const getPrescriptionsForDoctor = async (req, res) => {
  try {
    const doctorEmail = req.params.email;
    const prescriptions = await Prescription.find({ doctorEmail });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctor prescriptions', error: err.message });
  }
};

// GET /api/prescriptions/myprescriptions
const getPrescriptionsForPatient = async (req, res) => {
  try {
    const patientEmail = req.user?.email || req.userEmail || req.query.email;
    const prescriptions = await Prescription.find({ patientEmail });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patient prescriptions', error: err.message });
  }
};

// POST /api/prescriptions
const createPrescription = async (req, res) => {
  try {
    const { patientEmail, patientName, doctorEmail, doctorName, date, diagnosis, medicines, notes } = req.body;
    const newPrescription = new Prescription({
      patientEmail,
      patientName,
      doctorEmail,
      doctorName,
      date,
      diagnosis,
      medicines,
      notes,
    });
    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (err) {
    res.status(500).json({ message: 'Error creating prescription', error: err.message });
  }
};

module.exports = {
  getPrescriptionsForDoctor,
  getPrescriptionsForPatient,
  createPrescription,
};
