import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    gameName: {
      type: mongoose.Schema.Types.ObjectId, // Thay String bằng ObjectId
      ref: "GameName", // Tham chiếu tới model GameName
      required: true,
    },
    accountType: {
      type: String,
      enum: ["email", "facebook"],
      required: true,
    },
    accountEmail: {
      type: String,
      required: function () {
        return this.accountType === "email";
      },
    },
    accountFacebookId: {
      type: String,
      required: function () {
        return this.accountType === "facebook";
      },
    },
    password: {
      type: String,
      required: true,
    },
    twoFactorCode: {
      type: String,
      default: null,
    },
    recoveryEmail: {
      type: String,
      default: null,
    },
    images: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Còn hàng", "Hết hàng"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("products", productSchema);