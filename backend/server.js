require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

/* ------------------ Database ------------------ */
connectDB();

/* ------------------ Middleware ------------------ */
app.use(cors());
app.use(express.json());

/* ------------------ Routes ------------------ */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/student-data', require('./routes/studentData'));
app.use('/api/skills', require('./routes/skills'));

/* ------------------ Health Check ------------------ */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'College AI Backend is running 🚀'
  });
});

/* ------------------ Server ------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
