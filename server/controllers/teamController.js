const Team = require('../models/Team');
const User = require('../models/User');

exports.getTeams = async (req, res) => {
  try {
    const { sport, city } = req.query;
    const query = {};
    if (sport && sport !== 'All Sports') query.sport = sport;
    if (city) query.city = { $regex: city, $options: 'i' };
    const teams = await Team.find(query)
      .populate('captain', 'name location')
      .sort('-createdAt');
    res.json({ success: true, teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('captain', 'name location sports')
      .populate('members', 'name location sports availability');
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    res.json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTeam = async (req, res) => {
  try {
    const { name, sport, description, location, city, maxMembers } = req.body;
    if (!name || !sport || !maxMembers) {
      return res.status(400).json({ success: false, message: 'Name, sport and max members are required' });
    }
    const team = await Team.create({
      name: name.trim(),
      sport,
      description: description || '',
      location: location || '',
      city: city || '',
      maxMembers: Number(maxMembers),
      captain: req.user._id,
      members: [req.user._id],
    });
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { teamsJoined: team._id } });
    const populated = await team.populate('captain', 'name location');
    res.status(201).json({ success: true, team: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.joinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    if (team.members.some(m => m.toString() === req.user._id.toString())) {
      return res.status(400).json({ success: false, message: 'You are already a member of this team' });
    }
    if (team.members.length >= team.maxMembers) {
      return res.status(400).json({ success: false, message: 'This team is full' });
    }
    team.members.push(req.user._id);
    if (team.members.length >= team.maxMembers) team.status = 'closed';
    await team.save();
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { teamsJoined: team._id } });
    res.json({ success: true, message: 'Joined team successfully', team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.leaveTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    if (!team.members.some(m => m.toString() === req.user._id.toString())) {
      return res.status(400).json({ success: false, message: 'You are not a member of this team' });
    }
    if (team.captain.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Captain cannot leave. Transfer captaincy or disband the team.' });
    }
    team.members = team.members.filter(m => m.toString() !== req.user._id.toString());
    team.status = 'open';
    await team.save();
    await User.findByIdAndUpdate(req.user._id, { $pull: { teamsJoined: team._id } });
    res.json({ success: true, message: 'Left team successfully', team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
