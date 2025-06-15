const HospitalSlot = require('../models/HospitalSlot');

// POST: create a new hospital slot
exports.createHospitalSlot = async (req, res) => {
  try {
    const newSlot = new HospitalSlot(req.body);
    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: fetch all slots (for HospitalDashboard)
exports.getAllHospitalSlots = async (req, res) => {
  try {
    const slots = await HospitalSlot.find(); // No filter
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
