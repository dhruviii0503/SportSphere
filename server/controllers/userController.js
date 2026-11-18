const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const { sport, location, limit = 50 } = req.query;
    const query = {};
    if (sport && sport !== 'All Sports') query.sports = sport;
    if (location) query.location = { $regex: location, $options: 'i' };
    const users = await User.find(query).select('-password').limit(Number(limit)).sort('-createdAt');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('gamesJoined', 'title sport date status')
      .populate('teamsJoined', 'name sport');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, location, bio, sports, availability } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    if (sports !== undefined) updateData.sports = sports;
    if (availability !== undefined) updateData.availability = availability;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
