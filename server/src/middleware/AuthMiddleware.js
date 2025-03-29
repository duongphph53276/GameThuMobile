// server/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            message: "Không có token, vui lòng đăng nhập",
            status: false
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gắn thông tin người dùng (email, id, name) vào req.user
        next();
    } catch (error) {
        console.error('Lỗi xác minh token:', error);
        return res.status(401).send({
            message: "Token không hợp lệ hoặc đã hết hạn",
            status: false
        });
    }
};

export default authMiddleware;