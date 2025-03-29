import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { AddOrder, ListOrder, EditOrder, DeleteOrder } from './controllers/orders.js';

const app = express();
const PORT = 5000; 

// Middleware
app.use(express.json());
app.use(cors()); // Cho phép frontend gọi API

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gamethumobile', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Kết nối DB thành công');
    } catch (error) {
        console.error('Kết nối DB thất bại:', error);
        process.exit(1); // Thoát nếu kết nối DB thất bại
    }
};

// Routes
// app.post('/warranty', AddOrder);
// app.get('/warranty', ListOrder);
// app.put('/warranty/:id', EditOrder);
// app.delete('/warranty/:id', DeleteOrder);

// Khởi động server
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});