const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost } = require('../controllers/communityController');
const { protect } = require('../middleware/auth');

router.get('/', getPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, likePost);

module.exports = router;
