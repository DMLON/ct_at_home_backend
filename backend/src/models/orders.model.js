import mongoose from "mongoose";

const ordersCollection = "orders";

export const ordersSchema = new mongoose.Schema(
    {
        products: [
            {
                quantity: {
                    type: Number,
                    default: 0,
                },
                // Acá los productos son copias directo del modelo, pero no uso referencia ya que sino los precios no van a corresponder si se editan
                product: {
                    name: { type: String, required: true, unique: true },
                    description: { type: String, required: true },
                    photo: { type: String, required: true },
                    price: { type: Number, required: true },
                    category: { type: String, required: true },
                },
            },
        ],
        status: { type: String, enum: ["generated", "paid", "shipped", "delivered", "cancelled"], default: "generated" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    { timestamps: true }
);

export const ordersModel = mongoose.model(ordersCollection, ordersSchema);
