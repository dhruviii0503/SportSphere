const express = require('express');
const router = express.Router();
const {
  getGames, getGameById, createGame, updateGame, deleteGame, joinGame, leaveGame
} = require('../controllers/gameController');
const { protect } = require('../middleware/auth');

router.get('/', getGames);
router.post('/', protect, createGame);
router.get('/:id', getGameById);
router.put('/:id', protect, updateGame);
router.delete('/:id', protect, deleteGame);
router.post('/:id/join', protect, joinGame);
router.post('/:id/leave', protect, leaveGame);

module.exports = router;
