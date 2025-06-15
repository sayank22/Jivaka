// controllers/diagnosticBookingController.js
const DiagnosticBooking = require("../models/DiagnosticBooking");

// Utility to get next slot number
async function getNextSlotNumber(center, date) {
  const bookings = await DiagnosticBooking.find({ center, date });
  return bookings.length + 1;
}

const bookDiagnosticTest = async (req, res) => {
  let { patientName, patientEmail, testName, center, price, date, notes } = req.body;

  try {
     if (typeof price === "string") {
      price = parseFloat(price.replace(/[^0-9.]/g, ""));
    }
    const slotNumber = await getNextSlotNumber(center, date);
    const time = `${9 + (slotNumber - 1)}:00 AM`;

    const newBooking = new DiagnosticBooking({
      patientName,
      patientEmail,
      testName,
      center,
      price,
      date,
      time,
      slotNumber,
      notes,
    });

    await newBooking.save();
    res.status(201).json({ message: "Test booked successfully", slotNumber, time });
  } catch (error) {
    console.error("Diagnostic booking failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await DiagnosticBooking.find().sort({ date: 1, slotNumber: 1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = {
  bookDiagnosticTest,
  getAllBookings,
};
