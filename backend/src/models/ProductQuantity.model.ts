

import mongoose from "mongoose";
import { ProductSchema, Product } from "./product.model";

const ProductQuantitySchemaCollection = "productQuantity";

export interface ProductQuantity{
    product:Product,
    quantity:Number
}

export const ProductQuantitySchema = new mongoose.Schema<ProductQuantity>({
    product:{type:ProductSchema, required:true},
    quantity:Number
})

export const productQuantityModel = mongoose.model<ProductQuantity>(ProductQuantitySchemaCollection,ProductQuantitySchema);

//mongodb+srv://dbUser:<password>@cluster0.tkmat.mongodb.net/myFirstDatabase?retryWrites=true&w=majority