import mongoose from "mongoose";
import { ProductQuantitySchema, ProductQuantity} from "./ProductQuantity.model";
//https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
const CartCollection = "cart";

export interface Cart{
    timestamp: Date,
    products: Array<ProductQuantity>
}

const CartSchema = new mongoose.Schema<Cart>({
    timestamp: {type: Date},
    products: [ProductQuantitySchema]
})

export const cartModel = mongoose.model<Cart>(CartCollection,CartSchema);