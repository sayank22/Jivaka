const express = require('express');
const router = express.Router();
const { bookAppointment, getAllAppointments } = require('../controllers/appointmentController');

router.post('/book', bookAppointment);
router.get('/', getAllAppointments);

module.exports = router;
