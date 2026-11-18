const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]); 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes       = require('./routes/auth');
const userRoutes       = require('./routes/users');
const gameRoutes       = require('./routes/games');
const teamRoutes       = require('./routes/teams');
const communityRoutes  = require('./routes/community');
const adminRoutes      = require('./routes/admin');

// Connect to MongoDB
connectDB();

const app = express();

// CORS - allow frontend origins
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
  credentials: true,
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'SportSphere API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use('/api/auth',       authRoutes);
app.use('/api/users',      userRoutes);
app.use('/api/games',      gameRoutes);
app.use('/api/teams',      teamRoutes);
app.use('/api/community',  communityRoutes);
app.use('/api/admin',      adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 SportSphere API running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
