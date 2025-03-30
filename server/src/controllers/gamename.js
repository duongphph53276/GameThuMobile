// server/src/controllers/gamenames.js
import { GameNameModel } from '../models/gamename.js';
import slugify from 'slugify';

// Thêm GameName mới
export const AddGameName = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true }); // Tự sinh slug từ name
    const gameName = await new GameNameModel({ name, slug }).save();
    res.status(201).send({ message: 'Thêm game thành công', status: true, data: gameName });
  } catch (error) {
    res.status(500).send({ message: 'Thêm thất bại', status: false, error: error.message });
  }
};

// Lấy danh sách GameName
export const ListGameNames = async (req, res) => {
  try {
    const gameNames = await GameNameModel.find();
    res.status(200).send({ message: 'Tải danh sách game thành công', status: true, data: gameNames });
  } catch (error) {
    res.status(500).send({ message: 'Tải thất bại', status: false, error: error.message });
  }
};

// Sửa GameName
export const EditGameName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const gameName = await GameNameModel.findById(id);
    if (!gameName) {
      return res.status(404).send({ message: 'Không tìm thấy game', status: false });
    }
    gameName.name = name;
    gameName.slug = slugify(name, { lower: true, strict: true }); // Cập nhật slug khi sửa name
    await gameName.save();
    res.status(200).send({ message: 'Cập nhật game thành công', status: true, data: gameName });
  } catch (error) {
    res.status(500).send({ message: 'Cập nhật thất bại', status: false, error: error.message });
  }
};

// Xóa GameName
export const DeleteGameName = async (req, res) => {
  try {
    const { id } = req.params;
    const gameName = await GameNameModel.findByIdAndDelete(id);
    if (!gameName) {
      return res.status(404).send({ message: 'Không tìm thấy game', status: false });
    }
    res.status(200).send({ message: 'Xóa game thành công', status: true, data: gameName });
  } catch (error) {
    res.status(500).send({ message: 'Xóa thất bại', status: false, error: error.message });
  }
};

// Lấy GameName theo ID
export const GetGameNameById = async (req, res) => {
  try {
    const { id } = req.params;
    const gameName = await GameNameModel.findById(id);
    if (!gameName) {
      return res.status(404).send({ message: 'Không tìm thấy game', status: false });
    }
    res.status(200).send({ message: 'Lấy game thành công', status: true, data: gameName });
  } catch (error) {
    res.status(500).send({ message: 'Lấy game thất bại', status: false, error: error.message });
  }
};