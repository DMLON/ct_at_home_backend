import mongoose from "mongoose";

const ProductCollection = "products";

export const ProductSchema = new mongoose.Schema({
    timestamp: {type: Date},
    name: {type: String, required: true, unique:true},
    description: {type: String, required: true},
    code: {type: String, required: true,unique:true},
    photo: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
})

export const productModel = mongoose.model(ProductCollection,ProductSchema);
