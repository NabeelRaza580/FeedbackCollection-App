const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
