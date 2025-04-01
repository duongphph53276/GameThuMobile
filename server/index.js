import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { AddProduct, ListProduct, EditProduct, DeleteProduct, GetProductById } from './src/controllers/products.js';
import { Register, Login, VerifyToken, Profile, UpdateProfile } from './src/controllers/auth.js';
import { AddGameName, DeleteGameName, EditGameName, GetGameNameById, ListGameNames } from './src/controllers/gamename.js';
import { authMiddleware, restrictTo } from './src/middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gamethumobile');
    console.log('Kết nối DB thành công');
  } catch (error) {
    console.error('Kết nối DB thất bại:', error);
    process.exit(1);
  }
};

// Public routes
app.post('/register', Register);
app.post('/login', Login);
app.get('/verify-token', VerifyToken);
app.get('/products', ListProduct);
app.get('/products/:id', GetProductById);
app.get('/gamenames', ListGameNames); // Route public
app.get('/gamenames/:id', GetGameNameById);

// Protected routes cho client (đã đăng nhập)
app.get('/profile', authMiddleware, Profile);
app.put('/profile', authMiddleware, UpdateProfile);

// Admin routes (chỉ admin)
const adminRouter = express.Router();
adminRouter.use(authMiddleware, restrictTo('admin'));
adminRouter.get('/products', ListProduct);
adminRouter.get('/products/:id', GetProductById);
adminRouter.get('/gamenames', ListGameNames);
adminRouter.get('/gamenames/:id', GetGameNameById);
adminRouter.post('/products/add', AddProduct);
adminRouter.put('/products/edit/:id', EditProduct);
adminRouter.delete('/products/:id', DeleteProduct);
adminRouter.post('/gamenames/add', AddGameName);
adminRouter.put('/gamenames/edit/:id', EditGameName);
adminRouter.delete('/gamenames/:id', DeleteGameName);

app.use('/admin', adminRouter);

// Khởi động server
const startServer = async () => {
  await connectDB(); // Đợi kết nối DB trước khi chạy server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();