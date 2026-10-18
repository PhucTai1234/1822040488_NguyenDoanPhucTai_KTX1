const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Giúp đọc dữ liệu JSON từ req.body

// Đường link kết nối MongoDB Local (dùng trên máy tính thay cho Atlas)
const MONGO_URI = 'mongodb://127.0.0.1:27017/note_app_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Đã kết nối MongoDB Local thành công!'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));
// -----------------------------------------------

// Sử dụng routes
app.use('/', noteRoutes);

// Chạy server ở cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Backend đang chạy tại http://localhost:${PORT}`);
});