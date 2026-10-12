import User from '../models/User.js';

const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = Array.isArray(req.query.apiKey) ? req.query.apiKey[0] : req.query.apiKey;

    if (!apiKey) {
      return res.status(401).json({ error: 'Không tìm thấy apiKey, vui lòng cung cấp apiKey để xác thực.' });
    }

    const [prefix, userId, ...rest] = apiKey.split('-');
    if (prefix !== 'mern' || !userId || rest.length === 0) {
      return res.status(401).json({ error: 'apiKey không hợp lệ.' });
    }

    const user = await User.findOne({ _id: userId, apiKey });

    if (!user) {
      return res.status(401).json({ error: 'apiKey không xác thực được hoặc đã hết hạn.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi xác thực hệ thống: ' + error.message });
  }
};

export default verifyApiKey;