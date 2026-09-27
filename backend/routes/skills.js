const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StudentData = require('../models/StudentData');
const roadmapService = require('../services/roadmapService');

// Get user skills
router.get('/', auth, async (req, res) => {
  try {
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.json({ skills: data.skills || [] });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add skills
router.post('/', auth, async (req, res) => {
  try {
    const { skills } = req.body; // Array of skill objects: [{ name, category, level }]
    
    let data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      data = new StudentData({ userId: req.userId });
    }

    // Add new skills (avoid duplicates)
    skills.forEach(skill => {
      const exists = data.skills.find(s => s.name === skill.name);
      if (!exists) {
        data.skills.push(skill);
      }
    });

    await data.save();
    res.json({ skills: data.skills });
  } catch (error) {
    console.error('Add skills error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Generate roadmap
router.post('/generate-roadmap', auth, async (req, res) => {
  try {
    const { goal, selectedSkills, level } = req.body;
    
    // Generate roadmap
    const steps = roadmapService.generateRoadmap(goal, selectedSkills, level);
    
    // Save to database
    let data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      data = new StudentData({ userId: req.userId });
    }

    const roadmap = {
      goal,
      skills: selectedSkills,
      steps,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    data.roadmaps.push(roadmap);
    await data.save();

    res.json({ roadmap });
  } catch (error) {
    console.error('Generate roadmap error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user roadmaps
router.get('/roadmaps', auth, async (req, res) => {
  try {
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.json({ roadmaps: data.roadmaps || [] });
  } catch (error) {
    console.error('Get roadmaps error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update roadmap step completion
router.put('/roadmaps/:roadmapId/steps/:stepIndex', auth, async (req, res) => {
  try {
    const { roadmapId, stepIndex } = req.params;
    const { completed } = req.body;
    
    const data = await StudentData.findOne({ userId: req.userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }

    const roadmap = data.roadmaps.id(roadmapId);
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    roadmap.steps[stepIndex].completed = completed;
    roadmap.updatedAt = new Date();

    await data.save();
    res.json({ roadmap });
  } catch (error) {
    console.error('Update step error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;