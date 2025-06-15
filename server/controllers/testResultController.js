const TestResult = require('../models/TestResult');

exports.uploadTestResult = async (req, res) => {
  try {
    const { patientName, recommendedDoctor, testName, result, uploadedBy } = req.body;
    const fileUrl = req.file?.path || ''; // file upload (use multer)

    const testResult = new TestResult({
      patientName,
      recommendedDoctor,
      testName,
      result,
      fileUrl,
      uploadedBy,
    });

    await testResult.save();
    res.status(201).json(testResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTestResults = async (req, res) => {
  try {
    const results = await TestResult.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
