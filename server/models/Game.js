const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title:          { type: String, required: true, trim: true },
  sport:          { type: String, required: true, enum: ['Football','Cricket','Badminton','Basketball','Volleyball','Tennis'] },
  description:    { type: String, default: '' },
  location:       { type: String, required: true },
  city:           { type: String, default: '' },
  date:           { type: Date, required: true },
  time:           { type: String, required: true },
  duration:       { type: String, default: '1 hour' },
  maxPlayers:     { type: Number, required: true, min: 2, max: 100 },
  currentPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  host:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status:         { type: String, enum: ['upcoming','ongoing','completed','cancelled'], default: 'upcoming' },
  agePreference:  { type: String, default: '' },
  contact:        { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
