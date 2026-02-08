const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  code: { type: String, required: true },
  present: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  lastClass: { type: Date, default: Date.now }
});

const marksSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  mid1: { type: Number, default: 0 },
  mid2: { type: Number, default: 0 },
  assignment: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  maxMarks: { type: Number, default: 100 }
});

const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  time: { type: String, required: true },
  subject: { type: String, required: true },
  room: { type: String },
  faculty: { type: String }
});

// NEW: Skill Schema
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String }, // e.g., "Programming", "Web Development", "Data Science"
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  addedAt: { type: Date, default: Date.now }
});

// NEW: Roadmap Schema
const roadmapSchema = new mongoose.Schema({
  goal: { type: String, required: true },
  skills: [String], // Skills user selected
  steps: [{
    title: String,
    description: String,
    duration: String,
    resources: [String],
    completed: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const studentDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  attendance: [attendanceSchema],
  marks: [marksSchema],
  timetable: [timetableSchema],
  subjects: [{
    name: String,
    code: String,
    faculty: String
  }],
  skills: [skillSchema], // NEW
  roadmaps: [roadmapSchema], // NEW
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update percentage before saving
attendanceSchema.pre('save', function(next) {
  if (this.total > 0) {
    this.percentage = Math.round((this.present / this.total) * 100);
  }
  next();
});

module.exports = mongoose.model('StudentData', studentDataSchema);