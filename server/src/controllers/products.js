import { ProductModel } from "../models/product.ts";

export const AddProduct = async(req,res) => {
    try {
        const body = req.body
        const product = await new ProductModel(body).save()
        res.status(201).send({message:"Thêm mới thành công",status:true,data:product})
    } catch (error) {
        res.status(500).send({message:"Thêm thất bại",status:false})
    }
}

export const ListProduct = async(req,res) => {
    try {
        const product2 = await ProductModel.find()
        res.status(200).send({message:"tải sản phẩm thành công",status:true,data:product2})
    } catch (error) {
        res.status(500).send({message:"tải thất bại",status:false})
    }
}

export const EditProduct = async(req,res) =>{
    try {
        const id = req.params.id
        const body = req.body
        const product3 = await ProductModel.findOne({_id:id})
        if(product3){
            const UpdateProduct = await ProductModel.findOneAndUpdate({_id:id},body,{new:true})
            res.status(200).send({message:"cập nhật thành công",status:true,data:UpdateProduct})
        }
        else throw {mes:"không tìm thấy sản phẩm"}
    } catch (error) {
        res.status(500).send({message:error.mes??"Cập nhật thất bại",status:false})
    }
}

export const DeleteProduct = async(req,res) => {
    try {
        const id = req.params.id
        const product4 = await ProductModel.findOne({_id:id})
        if(product4){
            await ProductModel.findOneAndDelete({_id:id})
            res.status(200).send({message:"Xóa thành công",status:true,data:product4})
        }
        else throw {mes:"không tìm thấy đơn hàng",code:404}
    } catch (error) {
        res.status(500).send({message:error.mes??"Xóa thất bại",status:false})
    }
}
export const GetProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).send({ message: "Không tìm thấy đơn hàng", status: false });
        }

        res.status(200).send({ message: "Lấy thông tin đơn hàng thành công", status: true, data: product });
    } catch (error) {
        res.status(500).send({ message: "Lấy thông tin đơn hàng thất bại", status: false });
    }
};