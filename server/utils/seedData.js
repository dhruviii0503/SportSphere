require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
// Also try local .env
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Game = require('../models/Game');
const Team = require('../models/Team');
const Post = require('../models/Post');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sportsphere';

async function seedData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected! Clearing old seed data...');

    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Game.deleteMany({}),
      Team.deleteMany({}),
      Post.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // ─── USERS ───
    const hashedAdmin = await bcrypt.hash('Admin@123', 10);
    const hashedDemo  = await bcrypt.hash('Demo@123', 10);
    const hashedUser  = await bcrypt.hash('User@123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@sportsphere.com',
      password: hashedAdmin,
      location: 'Mumbai',
      bio: 'SportSphere Platform Administrator',
      sports: ['Football', 'Cricket'],
      role: 'admin',
      availability: 'Always available',
    });

    const demo = await User.create({
      name: 'Demo Player',
      email: 'demo@sportsphere.com',
      password: hashedDemo,
      location: 'Andheri, Mumbai',
      bio: 'Sports enthusiast based in Andheri. I love football and cricket. Looking for teammates in Mumbai!',
      sports: ['Football', 'Cricket', 'Badminton'],
      availability: 'Available weekends',
    });

    const aarav = await User.create({
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      password: hashedUser,
      location: 'Andheri West, Mumbai',
      bio: 'Football lover. Organise weekly 5v5 games in Andheri. Always looking for good players.',
      sports: ['Football'],
      availability: 'Available evenings and weekends',
    });

    const riya = await User.create({
      name: 'Riya Mehta',
      email: 'riya@example.com',
      password: hashedUser,
      location: 'Powai, Mumbai',
      bio: 'Badminton and volleyball player. Enjoy casual games on weekends.',
      sports: ['Badminton', 'Volleyball'],
      availability: 'Available today',
    });

    const kabir = await User.create({
      name: 'Kabir Patel',
      email: 'kabir@example.com',
      password: hashedUser,
      location: 'Bandra, Mumbai',
      bio: 'Cricket all-rounder. Weekend warrior. Looking for a solid cricket group.',
      sports: ['Cricket', 'Football'],
      availability: 'Available this weekend',
    });

    const ananya = await User.create({
      name: 'Ananya Desai',
      email: 'ananya@example.com',
      password: hashedUser,
      location: 'Juhu, Mumbai',
      bio: 'Tennis player looking for mixed doubles partners. Also enjoy morning volleyball at Juhu Beach.',
      sports: ['Tennis', 'Volleyball'],
      availability: 'Available mornings',
    });

    const vihaan = await User.create({
      name: 'Vihaan Rao',
      email: 'vihaan@example.com',
      password: hashedUser,
      location: 'Goregaon, Mumbai',
      bio: 'Basketball player. 3v3 or full court — always up for a game.',
      sports: ['Basketball'],
      availability: 'Available this weekend',
    });

    console.log('✓ Users created (7)');

    // ─── GAMES ───
    const tomorrow    = new Date(Date.now() + 1  * 86400000);
    const in2Days     = new Date(Date.now() + 2  * 86400000);
    const in3Days     = new Date(Date.now() + 3  * 86400000);
    const in4Days     = new Date(Date.now() + 4  * 86400000);
    const in5Days     = new Date(Date.now() + 5  * 86400000);
    const in6Days     = new Date(Date.now() + 6  * 86400000);

    const game1 = await Game.create({
      title: 'Friday Night 5v5 Football',
      sport: 'Football',
      description: 'Casual 5v5 football at Andheri Sports Complex. All skill levels welcome. Bring shin guards and water.',
      location: 'Andheri Sports Complex, Andheri West',
      city: 'Mumbai',
      date: tomorrow,
      time: '7:00 PM',
      duration: '1.5 hours',
      maxPlayers: 10,
      currentPlayers: [aarav._id, demo._id, kabir._id],
      host: aarav._id,
      contact: 'aarav@example.com',
    });

    const game2 = await Game.create({
      title: 'Weekend Cricket at Powai',
      sport: 'Cricket',
      description: 'Casual cricket at Powai Ground. Looking for 11 players. Gear not mandatory but preferred.',
      location: 'Powai Cricket Ground, Powai',
      city: 'Mumbai',
      date: in2Days,
      time: '8:00 AM',
      duration: '3 hours',
      maxPlayers: 12,
      currentPlayers: [kabir._id, demo._id, admin._id],
      host: kabir._id,
      contact: 'kabir@example.com',
    });

    const game3 = await Game.create({
      title: 'Evening Badminton Doubles',
      sport: 'Badminton',
      description: 'Mixed doubles badminton at SportZone Arena. Indoor court. Rackets available on request.',
      location: 'SportZone Arena, Bandra West',
      city: 'Mumbai',
      date: tomorrow,
      time: '6:30 PM',
      duration: '1 hour',
      maxPlayers: 4,
      currentPlayers: [riya._id],
      host: riya._id,
    });

    const game4 = await Game.create({
      title: 'Sunday 3v3 Basketball',
      sport: 'Basketball',
      description: '3v3 basketball at Goregaon Sports Complex. Fun but competitive. Bring your A-game.',
      location: 'Goregaon Sports Complex, Goregaon East',
      city: 'Mumbai',
      date: in3Days,
      time: '5:00 PM',
      duration: '2 hours',
      maxPlayers: 6,
      currentPlayers: [vihaan._id, demo._id],
      host: vihaan._id,
    });

    const game5 = await Game.create({
      title: 'Juhu Beach Volleyball',
      sport: 'Volleyball',
      description: 'Beach volleyball at Juhu. Fun casual game. Sunscreen and energy required!',
      location: 'Juhu Beach, Juhu',
      city: 'Mumbai',
      date: in4Days,
      time: '6:00 AM',
      duration: '1.5 hours',
      maxPlayers: 8,
      currentPlayers: [ananya._id, riya._id, demo._id],
      host: ananya._id,
    });

    const game6 = await Game.create({
      title: 'Tennis Singles Practice',
      sport: 'Tennis',
      description: 'Looking for a tennis partner for singles rallying and practice sets at Willingdon Club.',
      location: 'Willingdon Sports Club, Churchgate',
      city: 'Mumbai',
      date: in2Days,
      time: '7:00 AM',
      duration: '1 hour',
      maxPlayers: 2,
      currentPlayers: [ananya._id],
      host: ananya._id,
    });

    const game7 = await Game.create({
      title: 'Bandra Football 7v7',
      sport: 'Football',
      description: '7v7 football at the Carter Road ground. Competitive friendly game. Proper boots required.',
      location: 'Carter Road Ground, Bandra',
      city: 'Mumbai',
      date: in5Days,
      time: '6:00 PM',
      duration: '2 hours',
      maxPlayers: 14,
      currentPlayers: [kabir._id, aarav._id],
      host: kabir._id,
    });

    const game8 = await Game.create({
      title: 'Morning Cricket — Matunga',
      sport: 'Cricket',
      description: 'Early morning cricket session. Good pitch, full ground. Serious players only.',
      location: 'Matunga Gymkhana, Matunga',
      city: 'Mumbai',
      date: in6Days,
      time: '6:30 AM',
      duration: '3 hours',
      maxPlayers: 12,
      currentPlayers: [admin._id],
      host: admin._id,
    });

    console.log('✓ Games created (8)');

    // Update user gamesJoined
    await User.findByIdAndUpdate(aarav._id,  { gamesJoined: [game1._id, game7._id] });
    await User.findByIdAndUpdate(demo._id,   { gamesJoined: [game1._id, game2._id, game4._id, game5._id] });
    await User.findByIdAndUpdate(kabir._id,  { gamesJoined: [game1._id, game2._id, game7._id] });
    await User.findByIdAndUpdate(riya._id,   { gamesJoined: [game3._id, game5._id] });
    await User.findByIdAndUpdate(ananya._id, { gamesJoined: [game5._id, game6._id] });
    await User.findByIdAndUpdate(vihaan._id, { gamesJoined: [game4._id] });
    await User.findByIdAndUpdate(admin._id,  { gamesJoined: [game2._id, game8._id] });

    // ─── TEAMS ───
    const team1 = await Team.create({
      name: 'Andheri Football Crew',
      sport: 'Football',
      description: 'A local football community playing regular games every Friday evening in Andheri. All levels welcome.',
      location: 'Andheri West, Mumbai',
      city: 'Mumbai',
      maxMembers: 15,
      members: [aarav._id, demo._id, kabir._id],
      captain: aarav._id,
    });

    const team2 = await Team.create({
      name: 'Weekend Warriors Cricket',
      sport: 'Cricket',
      description: 'Weekend cricket players building a regular playing group. All formats — T10, T20 and beyond.',
      location: 'Powai, Mumbai',
      city: 'Mumbai',
      maxMembers: 15,
      members: [kabir._id, demo._id, admin._id],
      captain: kabir._id,
    });

    const team3 = await Team.create({
      name: 'Bandra Smashers',
      sport: 'Badminton',
      description: 'Badminton players connecting for regular games around Bandra and Khar. Casual and friendly.',
      location: 'Bandra, Mumbai',
      city: 'Mumbai',
      maxMembers: 10,
      members: [riya._id, ananya._id],
      captain: riya._id,
    });

    const team4 = await Team.create({
      name: 'Juhu Tennis Circle',
      sport: 'Tennis',
      description: 'Tennis enthusiasts meeting for regular practice sessions and friendly matches.',
      location: 'Juhu, Mumbai',
      city: 'Mumbai',
      maxMembers: 8,
      members: [ananya._id],
      captain: ananya._id,
    });

    const team5 = await Team.create({
      name: 'Mumbai Hoopers',
      sport: 'Basketball',
      description: 'Basketball community for 3v3 and 5v5 games across Mumbai. Competitive and casual games.',
      location: 'Goregaon, Mumbai',
      city: 'Mumbai',
      maxMembers: 12,
      members: [vihaan._id, demo._id],
      captain: vihaan._id,
    });

    const team6 = await Team.create({
      name: 'Net Ninjas Volleyball',
      sport: 'Volleyball',
      description: 'Volleyball players for beach and indoor games. Weekend games at Juhu Beach.',
      location: 'Andheri, Mumbai',
      city: 'Mumbai',
      maxMembers: 10,
      members: [riya._id, ananya._id, demo._id],
      captain: riya._id,
    });

    console.log('✓ Teams created (6)');

    // Update user teamsJoined
    await User.findByIdAndUpdate(aarav._id,  { $push: { teamsJoined: team1._id } });
    await User.findByIdAndUpdate(demo._id,   { $push: { teamsJoined: { $each: [team1._id, team2._id, team5._id, team6._id] } } });
    await User.findByIdAndUpdate(kabir._id,  { $push: { teamsJoined: { $each: [team1._id, team2._id] } } });
    await User.findByIdAndUpdate(riya._id,   { $push: { teamsJoined: { $each: [team3._id, team6._id] } } });
    await User.findByIdAndUpdate(ananya._id, { $push: { teamsJoined: { $each: [team3._id, team4._id, team6._id] } } });
    await User.findByIdAndUpdate(vihaan._id, { $push: { teamsJoined: team5._id } });
    await User.findByIdAndUpdate(admin._id,  { $push: { teamsJoined: team2._id } });

    // ─── COMMUNITY POSTS ───
    await Post.create({ author: demo._id,   content: 'Looking for football players in Andheri for evening games! We play every Friday at 7 PM at Andheri Sports Complex. DM me if interested. All skill levels welcome! 🏃', sport: 'Football' });
    await Post.create({ author: aarav._id,  content: 'Great session at Andheri Sports Complex yesterday! Found 2 new teammates through SportSphere. This platform is 🔥 If you are in Andheri and love football — let us connect!', sport: 'Football' });
    await Post.create({ author: kabir._id,  content: 'Anyone up for cricket this Sunday at Powai Ground? We need 3 more players to complete our 11. Reply here or message me directly. Gear available for those who need it.', sport: 'Cricket' });
    await Post.create({ author: riya._id,   content: 'Just joined the Bandra Smashers badminton team. Super welcoming community! Played our first session yesterday at SportZone. Really excited to start playing regularly.', sport: 'Badminton' });
    await Post.create({ author: ananya._id, content: 'Morning volleyball at Juhu beach is the absolute best way to start your day. We play every Tuesday and Thursday at 6 AM. Looking for more regular players to join us! 🏐', sport: 'Volleyball' });
    await Post.create({ author: vihaan._id, content: 'Started the Mumbai Hoopers basketball team last month and we already have 8 members! Looking for 4 more to complete our squad. If you play ball anywhere in Mumbai, come join us. 🏀', sport: 'Basketball' });
    await Post.create({ author: admin._id,  content: 'Welcome to SportSphere! This platform is built for people like us — sports lovers who just need more people to play with. Create a game, join a team, find your people. Get out there and play! 🏆' });

    console.log('✓ Community posts created (7)');

    console.log('\n✅ Seed data created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('DEMO ACCOUNTS:');
    console.log('  Admin:  admin@sportsphere.com  / Admin@123');
    console.log('  Demo:   demo@sportsphere.com   / Demo@123');
    console.log('  Player: aarav@example.com      / User@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seed error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

seedData();
