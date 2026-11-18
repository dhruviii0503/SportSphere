const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Game = require('../models/Game');
const Team = require('../models/Team');

// All admin routes require authentication + admin role
router.use(protect, admin);

router.get('/stats', async (req, res) => {
  try {
    const [users, games, teams] = await Promise.all([
      User.countDocuments(),
      Game.countDocuments(),
      Team.countDocuments(),
    ]);
    res.json({ success: true, stats: { users, games, teams } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json({ success: true, users });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ success: false, message: 'Cannot delete admin user' });
    await user.deleteOne();
    res.json({ success: true, message: 'User deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.get('/games', async (req, res) => {
  try {
    const games = await Game.find().populate('host', 'name').sort('-createdAt');
    res.json({ success: true, games });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.delete('/games/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Game deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find().populate('captain', 'name').sort('-createdAt');
    res.json({ success: true, teams });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
