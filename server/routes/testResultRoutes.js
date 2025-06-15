const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const TestResult = require('../models/TestResult');
const requireAuth = require('../middleware/auth'); // ✅ fixed

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Upload result
router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const { patientName, recommendedDoctor, testName, result } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newResult = new TestResult({
      patientName,
      recommendedDoctor,
      testName,
      result,
      fileUrl,
      uploadedBy: req.user.email,
    });

    await newResult.save();
    res.status(200).json({ message: 'Test result uploaded successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

router.get('/', requireAuth, async (req, res) => {
  try {
    const results = await TestResult.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch test results', details: err.message });
  }
});

module.exports = router;
