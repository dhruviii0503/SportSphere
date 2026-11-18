const express = require('express');
const router = express.Router();
const { getTeams, getTeamById, createTeam, joinTeam, leaveTeam } = require('../controllers/teamController');
const { protect } = require('../middleware/auth');

router.get('/', getTeams);
router.post('/', protect, createTeam);
router.get('/:id', getTeamById);
router.post('/:id/join', protect, joinTeam);
router.post('/:id/leave', protect, leaveTeam);

module.exports = router;
