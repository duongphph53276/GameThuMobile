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
      { expiresIn: "1h" }
    );
    user.password = undefined;

    res.status(200).send({ message: 'Đăng nhập thành công', user, token, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.mes ?? 'Đăng nhập thất bại', status: false });
  }
};