const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const posts = await Post.find()
      .populate('author', 'name location sports')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);
    const total = await Post.countDocuments();
    res.json({ success: true, posts, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, sport } = req.body;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Post content is required' });
    }
    if (content.length > 500) {
      return res.status(400).json({ success: false, message: 'Post cannot exceed 500 characters' });
    }
    const post = await Post.create({
      author: req.user._id,
      content: content.trim(),
      sport: sport || '',
    });
    const populated = await post.populate('author', 'name location sports');
    res.status(201).json({ success: true, post: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const userId = req.user._id.toString();

    const liked = post.likes.some(
      id => id.toString() === userId
    );

    if (liked) {
      post.likes = post.likes.filter(
        id => id.toString() !== userId
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      success: true,
      likes: post.likes.length,
      liked: !liked,
      likeIds: post.likes.map(id => id.toString())
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
