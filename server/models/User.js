const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:     { type: String, required: true, minlength: 6 },
  location:     { type: String, default: '' },
  bio:          { type: String, default: '', maxlength: 500 },
  sports:       [{ type: String }],
  avatar:       { type: String, default: '' },
  availability: { type: String, default: '' },
  role:         { type: String, enum: ['user', 'admin'], default: 'user' },
  gamesJoined:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  teamsJoined:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});
// Compare password
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

// Never return password in JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
