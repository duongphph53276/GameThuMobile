// Trong file controllers/users.js
import { UserModel } from '../models/user.js';

export const UserList = async (req, res) => {
    try {
        const users = await UserModel.find()
            .select('-password')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            status: true,
            message: "Lấy danh sách người dùng thành công",
            data: users
        });
    } catch (error) {
        console.log('Error in UserList:', error);
        res.status(500).json({
            status: false,
            message: "Lỗi server khi lấy danh sách người dùng",
            error: error.message
        });
    }
};

export const GetUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Không tìm thấy người dùng",
            });
        }
        
        return res.status(200).json({
            status: true,
            message: "Lấy thông tin người dùng thành công",
            data: user,
        });
    } catch (error) {
        console.log('Error in GetUserById:', error);
        res.status(500).json({
            status: false,
            message: "Lỗi server khi lấy thông tin người dùng",
            error: error.message,
        });
    }
};

export const UserEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, bannedUntil, banReason, role } = req.body;

        const user = await UserModel.findByIdAndUpdate(
            id,
            { status, bannedUntil, banReason, role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Không tìm thấy người dùng",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Cập nhật người dùng thành công",
            data: user,
        });
    } catch (error) {
        console.log('Error in UserEdit:', error);
        res.status(500).json({
            status: false,
            message: "Lỗi server khi cập nhật người dùng",
            error: error.message,
        });
    }
};