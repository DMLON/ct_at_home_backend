import mongoose from "mongoose";

const ProductCollection = "products";

export const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        photo: { type: String, required: true },
        price: { type: Number, required: true, min: [0, "price can't be negative"] },
        category: { type: String, required: true },
        stock: { type: Number, required: true, default: 0, min: [0, "Stock can't be negative"] },
    },
    { timestamps: true }
);

// Duplicate the ID field.
ProductSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ProductSchema.set('toJSON', {
    virtuals: true
});

export const productModel = mongoose.model(ProductCollection, ProductSchema);
