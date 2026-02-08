const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const StudentData = require('../models/StudentData');
const auth = require('../middleware/auth'); // Import auth middleware
const cgpaService = require('../services/cgpaService'); // Import CGPA service

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, rollNo, branch, semester } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      rollNo,
      branch,
      semester
    });

    await user.save();

    // Create empty student data
    const studentData = new StudentData({
      userId: user._id,
      attendance: [],
      marks: [],
      timetable: [],
      subjects: []
    });

    await studentData.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNo: user.rollNo,
        branch: user.branch,
        semester: user.semester
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNo: user.rollNo,
        branch: user.branch,
        semester: user.semester,
        cgpa: user.cgpa
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// NEW: Update CGPA manually
router.put('/update-cgpa', auth, async (req, res) => {
  try {
    const { cgpa } = req.body;

    if (cgpa < 0 || cgpa > 10) {
      return res.status(400).json({ error: 'CGPA must be between 0 and 10' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.cgpa = cgpa;
    await user.save();

    res.json({
      message: 'CGPA updated successfully',
      cgpa: user.cgpa
    });
  } catch (error) {
    console.error('Update CGPA error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// NEW: Auto-calculate CGPA from marks
router.post('/calculate-cgpa', auth, async (req, res) => {
  try {
    const studentData = await StudentData.findOne({ userId: req.userId });
    
    if (!studentData || !studentData.marks || studentData.marks.length === 0) {
      return res.status(400).json({ error: 'No marks data available' });
    }

    // Calculate CGPA
    const calculatedCGPA = cgpaService.calculateCGPA(studentData.marks);

    // Update user's CGPA
    const user = await User.findById(req.userId);
    user.cgpa = calculatedCGPA;
    await user.save();

    res.json({
      message: 'CGPA calculated and updated successfully',
      cgpa: calculatedCGPA,
      description: cgpaService.getGradeDescription(calculatedCGPA)
    });
  } catch (error) {
    console.error('Calculate CGPA error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// NEW: Get CGPA details
router.get('/cgpa-details', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const studentData = await StudentData.findOne({ userId: req.userId });

    const subjectGrades = studentData?.marks.map(mark => {
      const percentage = (mark.total / mark.maxMarks) * 100;
      return {
        subject: mark.subject,
        percentage: Math.round(percentage * 100) / 100,
        gradePoint: cgpaService.percentageToGradePoint(percentage),
        letterGrade: cgpaService.getLetterGrade(percentage)
      };
    }) || [];

    res.json({
      currentCGPA: user.cgpa,
      description: cgpaService.getGradeDescription(user.cgpa),
      subjectGrades,
      totalSubjects: subjectGrades.length
    });
  } catch (error) {
    console.error('Get CGPA details error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;