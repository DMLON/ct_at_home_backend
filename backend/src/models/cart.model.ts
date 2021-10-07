import mongoose, { PopulatedDoc } from "mongoose";
import { Product } from "./product.model";
//https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
const CartCollection = "cart";

export interface ProductQuantity{
    product:PopulatedDoc<Product & Document>,
    quantity:Number
}
export interface Cart{
    timestamp: Date,
    products: Array<ProductQuantity>
}

const CartSchema = new mongoose.Schema<Cart>({
    timestamp: {type: Date},
    products: [{
        quantity:{
            type:Number,
            default:0
        },
        product:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'products'
        }
    }]
})

export const cartModel = mongoose.model<Cart>(CartCollection,CartSchema);