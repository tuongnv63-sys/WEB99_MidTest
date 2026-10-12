import express from 'express';
import Post from '../models/Post.js';
import verifyApiKey from '../middleware/auth.js';

const router = express.Router();

// Yêu cầu 3: Tạo bài post
router.post('/', verifyApiKey, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content là bắt buộc.' });
    }

    const newPost = new Post({
      userId: req.user._id,
      content
    });

    await newPost.save();
    return res.status(201).json({ message: 'Tạo bài post thành công!', data: newPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Yêu cầu 4: Cập nhật bài post
router.put('/:id', verifyApiKey, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Không tìm thấy bài post.' });
    }

    post.content = content;
    await post.save();

    return res.status(200).json({ message: 'Cập nhật thành công!', data: post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;