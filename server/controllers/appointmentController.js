const Appointment = require('../models/Appointment');

const bookAppointment = async (req, res) => {
  const { patientName, doctorName, specialization, hospital, date, slot, reason } = req.body;

  try {
    const newAppointment = new Appointment({
      patientName,
      doctorName,
      specialization,
      hospital,
      date,
      slot,
      reason,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", slot });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching all appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  bookAppointment,
  getAllAppointments,
};
