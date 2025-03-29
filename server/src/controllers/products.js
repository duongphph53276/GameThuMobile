import { ProductModel } from "../models/product.js"; // Đã sửa đường dẫn

export const AddProduct = async (req, res) => {
    try {
        const body = req.body;
        const product = await new ProductModel(body).save();
        res.status(201).send({ message: "Thêm mới thành công", status: true, data: product });
    } catch (error) {
        res.status(500).send({ message: "Thêm thất bại", status: false, error: error.message });
    }
};

export const ListProduct = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).send({ message: "Tải sản phẩm thành công", status: true, data: products });
    } catch (error) {
        res.status(500).send({ message: "Tải thất bại", status: false, error: error.message });
    }
};

export const EditProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const product = await ProductModel.findOne({ _id: id });

        if (!product) {
            return res.status(404).send({ message: "Không tìm thấy sản phẩm", status: false });
        }

        const updatedProduct = await ProductModel.findOneAndUpdate({ _id: id }, body, { new: true });

        if (!updatedProduct) {
          return res.status(500).send({ message: "Cập nhật thất bại", status: false });
        }
        res.status(200).send({ message: "Cập nhật thành công", status: true, data: updatedProduct });
    } catch (error) {
        res.status(500).send({ message: error.message ?? "Cập nhật thất bại", status: false });
    }
};

export const DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findOne({ _id: id });

        if (!product) {
            return res.status(404).send({ message: "Không tìm thấy sản phẩm", status: false });
        }

        await ProductModel.findOneAndDelete({ _id: id });
        res.status(200).send({ message: "Xóa thành công", status: true, data: product });
    } catch (error) {
        res.status(500).send({ message: error.message ?? "Xóa thất bại", status: false });
    }
};

export const GetProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).send({ message: "Không tìm thấy sản phẩm", status: false });
        }

        res.status(200).send({ message: "Lấy thông tin sản phẩm thành công", status: true, data: product });
    } catch (error) {
        res.status(500).send({ message: "Lấy thông tin sản phẩm thất bại", status: false });
    }
};