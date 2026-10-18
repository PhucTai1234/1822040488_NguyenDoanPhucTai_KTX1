const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// API 1: Lấy danh sách ghi chú (mới nhất lên đầu)
router.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// API 2: Tạo ghi chú mới
router.post('/api/notes', async (req, res) => {
  try {
    const { title, content, isPinned } = req.body;
    const newNote = await Note.create({ title, content, isPinned });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: 'Tạo thất bại', error: err.message });
  }
});

module.exports = router;