const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StudentData = require('../models/StudentData');

// Get all student data
router.get('/', auth, async (req, res) => {
  try {
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Get data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add subject
router.post('/subjects', auth, async (req, res) => {
  try {
    const { name, code, faculty } = req.body;
    
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }

    data.subjects.push({ name, code, faculty });
    
    // Also add to attendance and marks
    data.attendance.push({
      subject: name,
      code,
      present: 0,
      total: 0,
      percentage: 0
    });

    data.marks.push({
      subject: code,
      mid1: 0,
      mid2: 0,
      assignment: 0,
      total: 0,
      maxMarks: 100
    });

    await data.save();
    res.json(data);
  } catch (error) {
    console.error('Add subject error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update attendance
router.put('/attendance/:subjectCode', auth, async (req, res) => {
  try {
    const { present, total } = req.body;
    
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }

    const attendance = data.attendance.find(a => a.code === req.params.subjectCode);
    if (!attendance) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    if (present !== undefined) attendance.present = present;
    if (total !== undefined) attendance.total = total;
    attendance.percentage = Math.round((attendance.present / attendance.total) * 100);
    attendance.lastClass = new Date();

    await data.save();
    res.json(data);
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark attendance (increment)
router.post('/attendance/:subjectCode/mark', auth, async (req, res) => {
  try {
    const { present } = req.body; // true or false
    
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }

    const attendance = data.attendance.find(a => a.code === req.params.subjectCode);
    if (!attendance) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    attendance.total += 1;
    if (present) attendance.present += 1;
    attendance.percentage = Math.round((attendance.present / attendance.total) * 100);
    attendance.lastClass = new Date();

    await data.save();
    res.json(data);
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update marks
router.put('/marks/:subjectCode', auth, async (req, res) => {
  try {
    const { mid1, mid2, assignment } = req.body;
    
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }

    const marks = data.marks.find(m => m.subject === req.params.subjectCode);
    if (!marks) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    if (mid1 !== undefined) marks.mid1 = mid1;
    if (mid2 !== undefined) marks.mid2 = mid2;
    if (assignment !== undefined) marks.assignment = assignment;
    marks.total = (marks.mid1 || 0) + (marks.mid2 || 0) + (marks.assignment || 0);

    await data.save();
    res.json(data);
  } catch (error) {
    console.error('Update marks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add timetable entry
router.post('/timetable', auth, async (req, res) => {
  try {
    const { day, time, subject, room, faculty } = req.body;
    
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }

    data.timetable.push({ day, time, subject, room, faculty });
    await data.save();
    res.json(data);
  } catch (error) {
    console.error('Add timetable error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk setup (for onboarding)
router.post('/bulk-setup', auth, async (req, res) => {
  try {
    const { subjects, attendance, marks, timetable } = req.body;
    
    let data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      data = new StudentData({ userId: req.userId });
    }

    if (subjects) data.subjects = subjects;
    if (attendance) data.attendance = attendance;
    if (marks) data.marks = marks;
    if (timetable) data.timetable = timetable;

    await data.save();
    res.json(data);
  } catch (error) {
    console.error('Bulk setup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;