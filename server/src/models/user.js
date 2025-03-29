import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String, // URL ảnh đại diện
            default: "", 
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["active", "banned"], // Trạng thái hoạt động hoặc bị khóa
            default: "active",
        },
        bannedUntil: {
            type: Date, // Thời gian bị khóa đến khi nào
            default: null, // Null nếu không bị khóa
        },
        banReason: {
            type: String, // Lý do bị khóa tài khoản
            default: "",
        },
    },
    {
        timestamps: true, // Tự động tạo createdAt và updatedAt
    }
);

export const UserModel = mongoose.model("users", UserSchema);
