import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

export default mongoose.model('Post', postSchema);