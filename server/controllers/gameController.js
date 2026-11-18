const Game = require('../models/Game');
const User = require('../models/User');

exports.getGames = async (req, res) => {
  try {
    const { sport, city, status, limit = 50 } = req.query;
    const query = {};
    if (sport && sport !== 'All Sports') query.sport = sport;
    if (city) query.city = { $regex: city, $options: 'i' };
    if (status) query.status = status;
    const games = await Game.find(query)
      .populate('host', 'name location')
      .sort('-createdAt')
      .limit(Number(limit));
    res.json({ success: true, games });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate('host', 'name location sports')
      .populate('currentPlayers', 'name location sports');
    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    res.json({ success: true, game });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createGame = async (req, res) => {
  try {
    const { title, sport, description, location, city, date, time, duration, maxPlayers, agePreference, contact } = req.body;
    if (!title || !sport || !location || !date || !time || !maxPlayers) {
      return res.status(400).json({ success: false, message: 'Title, sport, location, date, time and maxPlayers are required' });
    }
    const game = await Game.create({
      title: title.trim(),
      sport,
      description: description || '',
      location: location.trim(),
      city: city || '',
      date: new Date(date),
      time,
      duration: duration || '1 hour',
      maxPlayers: Number(maxPlayers),
      host: req.user._id,
      currentPlayers: [req.user._id],
      agePreference: agePreference || '',
      contact: contact || '',
    });
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { gamesJoined: game._id } });
    const populated = await game.populate('host', 'name location');
    res.status(201).json({ success: true, game: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    if (game.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only the host can update this game' });
    }
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('host', 'name location');
    res.json({ success: true, game: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    if (game.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this game' });
    }
    await game.deleteOne();
    res.json({ success: true, message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.joinGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    if (game.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'This game has been cancelled' });
    }
    const alreadyJoined = game.currentPlayers.some(p => p.toString() === req.user._id.toString());
    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: 'You have already joined this game' });
    }
    if (game.currentPlayers.length >= game.maxPlayers) {
      return res.status(400).json({ success: false, message: 'This game is full' });
    }
    game.currentPlayers.push(req.user._id);
    await game.save();
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { gamesJoined: game._id } });
    const populated = await game.populate('host', 'name location');
    res.json({ success: true, message: 'Joined game successfully', game: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.leaveGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    const hasJoined = game.currentPlayers.some(p => p.toString() === req.user._id.toString());
    if (!hasJoined) {
      return res.status(400).json({ success: false, message: 'You have not joined this game' });
    }
    if (game.host.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'The host cannot leave the game. Cancel it instead.' });
    }
    game.currentPlayers = game.currentPlayers.filter(p => p.toString() !== req.user._id.toString());
    await game.save();
    await User.findByIdAndUpdate(req.user._id, { $pull: { gamesJoined: game._id } });
    res.json({ success: true, message: 'Left game successfully', game });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
