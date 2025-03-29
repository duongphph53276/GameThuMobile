import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        gameName: {
            type: String,
            required: true
        },
        accountType: {
            type: String,
            enum: ["email", "facebook"],
            required: true
        },
        accountEmail: {
            type: String,
            required: function () { return this.accountType === "email"; }
        },
        accountFacebookId: {
            type: String,
            required: function () { return this.accountType === "facebook"; }
        },
        password: {
            type: String,
            required: true
        },
        twoFactorCode: {
            type: String,
            default: null
        },
        recoveryEmail: {
            type: String,
            default: null
        },
        images: {
            type: [String],
            default: []
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        stock: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["available", "sold out"],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

export const ProductModel = mongoose.model("products", productSchema);