import express from 'express';
import User from '../models/User.js';
import crypto from 'crypto';

const router = express.Router();

// Yêu cầu 1: Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin bắt buộc.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email đã tồn tại.' });
    }

    const newUser = new User({ userName, email, password });
    await newUser.save();

    return res.status(201).json({ message: 'Đăng ký thành công!', data: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Yêu cầu 2: Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Email hoặc mật khẩu không đúng.' });
    }

    const randomString = crypto.randomBytes(8).toString('hex');
    const apiKey = `mern-${user._id}-${randomString}`;

    user.apiKey = apiKey;
    await user.save();

    return res.status(200).json({ message: 'Đăng nhập thành công!', apiKey });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;