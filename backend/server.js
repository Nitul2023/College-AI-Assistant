const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require('dotenv').config();
require('./services/scheduler');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const studentDataRoutes = require('./routes/studentData');
const skillsRoutes = require('./routes/skills'); // NEW

app.use('/api/auth', authRoutes);
app.use('/api/student-data', studentDataRoutes);
app.use('/api/skills', skillsRoutes); // NEW

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});