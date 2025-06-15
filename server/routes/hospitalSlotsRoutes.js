const express = require('express');
const router = express.Router();
const {
  createHospitalSlot,
  getAllHospitalSlots, // ✅ Correctly imported
} = require('../controllers/hospitalSlotController');

router.post('/', createHospitalSlot);
router.get('/', getAllHospitalSlots); // ✅ Will work for HospitalDashboard

module.exports = router;
