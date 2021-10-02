import mongoose from "mongoose";

const ProductCollection = "products";

export interface Product{
    timestamp: Date
    name: String,
    description:  String, 
    code: String, 
    photo:String, 
    price: Number, 
    stock:  Number, 
}

export const ProductSchema = new mongoose.Schema({
    timestamp: {type: Date},
    name: {type: String, required: true, unique:true},
    description: {type: String, required: true},
    code: {type: String, required: true,unique:true},
    photo: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
})

export const productModel = mongoose.model<Product>(ProductCollection,ProductSchema);
