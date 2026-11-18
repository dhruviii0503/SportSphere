const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/profile', protect, updateProfile);

module.exports = router;
