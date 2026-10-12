import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Cấu hình biến môi trường từ file .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Định tuyến các Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Khai báo Port và URI từ biến môi trường hoặc giá trị mặc định
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_exam';

// 1. Thực hiện kết nối tới MongoDB
try {
  await mongoose.connect(MONGO_URI);
  console.log('Kết nối MongoDB thành công!');
} catch (error) {
  console.error('Lỗi kết nối MongoDB:', error.message);
  process.exit(1); // Thoát tiến trình nếu kết nối DB thất bại
}

// 2. Khởi chạy Server (listen port) tách biệt bên ngoài
app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng: http://localhost:${PORT}`);
});