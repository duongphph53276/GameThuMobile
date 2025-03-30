import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { AddProduct, ListProduct, EditProduct, DeleteProduct, GetProductById } from './src/controllers/products.js';
import { Register, Login } from './src/controllers/auth.js';
import { AddGameName, DeleteGameName, EditGameName, GetGameNameById, ListGameNames } from './src/controllers/gamename.js';

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

// Routes cho sản phẩm
app.post('/products/add', AddProduct);
app.get('/products', ListProduct);
app.put('/products/edit/:id', EditProduct);
app.delete('/products/:id', DeleteProduct);
app.get('/products/:id', GetProductById);
// Routes cho GameName
app.post('/gamenames/add', AddGameName);
app.get('/gamenames', ListGameNames);
app.put('/gamenames/edit/:id', EditGameName);
app.delete('/gamenames/:id', DeleteGameName);
app.get('/gamenames/:id', GetGameNameById);
//routes login
app.post('/register', Register);
app.post('/login', Login);

// Khởi động server
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});