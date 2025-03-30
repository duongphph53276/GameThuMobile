import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { AddProduct, ListProduct, EditProduct, DeleteProduct, GetProductById } from './src/controllers/products.js';
import { Register, Login } from './src/controllers/auth.js';
import { AddGameName, DeleteGameName, EditGameName, GetGameNameById, ListGameNames } from './src/controllers/gamename.js';
import { authMiddleware, restrictTo } from './src/middleware/auth.js';

// Load biến môi trường từ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Sử dụng biến môi trường PORT nếu có

// Middleware
app.use(express.json());
app.use(cors()); // Cho phép frontend gọi API

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gamethumobile');
        console.log('Kết nối DB thành công');
    } catch (error) {
        console.error('Kết nối DB thất bại:', error);
        process.exit(1); // Thoát nếu kết nối DB thất bại
    }
};

// Public routes
app.post('/register', Register);
app.post('/login', Login);

// Protected routes cho client (đã đăng nhập) // Client có thể xem danh sách sản phẩm
// app.get('/gamenames', authMiddleware, ListGameNames);
// app.get('/gamenames/:id', authMiddleware, GetGameNameById);

// Admin routes (chỉ admin truy cập được)
const adminRouter = express.Router();
adminRouter.use(authMiddleware, restrictTo('admin')); // Chỉ cho phép admin truy cập
adminRouter.get('/products', authMiddleware, ListProduct); 
adminRouter.get('/products/:id', authMiddleware, GetProductById);
adminRouter.post('/products/add', AddProduct);
adminRouter.put('/products/edit/:id', EditProduct);
adminRouter.delete('/products/:id', DeleteProduct);
adminRouter.get('/gamenames', authMiddleware, ListGameNames);
adminRouter.get('/gamenames/:id', authMiddleware, GetGameNameById);
adminRouter.post('/gamenames/add', AddGameName);
adminRouter.put('/gamenames/edit/:id', EditGameName);
adminRouter.delete('/gamenames/:id', DeleteGameName);

app.use('/admin', adminRouter); // Tất cả route /admin/* chỉ admin truy cập được

// Khởi động server
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});