const DiagnosticBooking = require("../models/DiagnosticBooking");

async function getNextSlotNumber(center, date) {
  const bookings = await DiagnosticBooking.find({ center, date });
  return bookings.length + 1;
}

const bookDiagnosticTest = async (req, res) => {
  let { patientName, testName, center, price, date } = req.body;

  try {
     if (typeof price === "string") {
      price = parseFloat(price.replace(/[^0-9.]/g, ""));
    }
    const slotNumber = await getNextSlotNumber(center, date);
    const time = `${9 + (slotNumber - 1)}:00 AM`;

    const newBooking = new DiagnosticBooking({
      patientName,
      testName,
      center,
      price,
      date,
      time,
      slotNumber,
    });
console.log("Incoming Diagnostic Booking Request:", req.body);

    await newBooking.save();
    res.status(201).json({ message: "Test booked successfully", slotNumber, time });
  } catch (error) {
    console.error("Diagnostic booking failed:", error.message);
    console.error("Full error stack:", error.stack);
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
