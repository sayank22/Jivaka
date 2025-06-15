const express = require('express');
const router = express.Router();
const { getPrescriptionsForDoctor, getPrescriptionsForPatient, createPrescription } = require('../controllers/prescriptionController');

// Route to get all prescriptions for a doctor
router.get('/doctor/:email', getPrescriptionsForDoctor);

// Route to get all prescriptions for a patient
router.get('/myprescriptions', getPrescriptionsForPatient);

// Route to create a new prescription
router.post('/', createPrescription);

module.exports = router;
