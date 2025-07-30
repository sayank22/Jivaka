const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const {
  bookDiagnosticTest,
  getAllBookings,
} = require("../controllers/diagnosticBookingController");

router.post("/book", authenticateToken, bookDiagnosticTest);
router.get("/all", authenticateToken, getAllBookings);

module.exports = router;
