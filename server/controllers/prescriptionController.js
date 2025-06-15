const Prescription = require('../models/Prescription');

// GET /api/prescriptions — Fetch all prescriptions
const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ date: -1 }); // newest first
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: err.message });
  }
};

// POST /api/prescriptions — Create a new prescription
const createPrescription = async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);

    const {
      patientName,
      symptoms,
      diagnosis,
      medicines,
    } = req.body;

    const newPrescription = new Prescription({
      patientName,
      symptoms,
      diagnosis,
      medicines,
      // 'date' is auto-filled by schema
    });

    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (err) {
    res.status(500).json({ message: 'Error creating prescription', error: err.message });
  }
};

module.exports = {
  getAllPrescriptions,
  createPrescription
};
