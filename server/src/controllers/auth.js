import { UserModel } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const body = req.body;
    const { email, password, role } = body;

    const check = await UserModel.findOne({ email });
    if (check) throw { mes: "Tài khoản đã tồn tại" };

    body.password = await bcrypt.hash(password, 11);
    body.role = role === "admin" ? "admin" : "client"; // Chỉ cho phép role admin nếu được chỉ định rõ
    const user = await new UserModel(body).save();
    user.password = undefined;

    res.status(201).send({ message: 'Đăng ký thành công', user, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.mes ?? 'Đăng ký thất bại', status: false });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) throw { mes: "Tài khoản không tồn tại" };

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw { mes: "Sai mật khẩu" };

    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name, role: user.role }, // Thêm role vào token
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    user.password = undefined;

    res.status(200).send({ message: 'Đăng nhập thành công', user, token, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.mes ?? 'Đăng nhập thất bại', status: false });
  }
};
export const VerifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Không có token", status: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select('-password'); // Lấy thông tin user, bỏ password
    if (!user) {
      return res.status(404).send({ message: "Người dùng không tồn tại", status: false });
    }

    res.status(200).send({ message: "Token hợp lệ", status: true, user });
  } catch (error) {
    res.status(401).send({ message: "Token không hợp lệ", status: false });
  }
};
export const Profile = async (req, res) => {
  try {
    // req.user đã được gắn bởi authMiddleware
    const user = await UserModel.findById(req.user.id).select('-password'); // Lấy thông tin user, bỏ password
    if (!user) {
      return res.status(404).send({ message: "Người dùng không tồn tại", status: false });
    }

    res.status(200).send({ message: "Lấy thông tin hồ sơ thành công", status: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Lấy thông tin hồ sơ thất bại", status: false });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { name, phoneNumber, avatar } = req.body; // Chỉ cho phép cập nhật các trường này
    const userId = req.user.id; // Lấy id từ token qua authMiddleware

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "Người dùng không tồn tại", status: false });
    }

    // Cập nhật các trường nếu có trong request body
    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (avatar) user.avatar = avatar;

    await user.save();
    const updatedUser = await UserModel.findById(userId).select('-password');

    res.status(200).send({ message: "Cập nhật hồ sơ thành công", status: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Cập nhật hồ sơ thất bại", status: false });
  }
};