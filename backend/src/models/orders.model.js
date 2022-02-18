import mongoose from "mongoose";

const ordersCollection = "orders";

export const OrdersSchema = new mongoose.Schema(
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
                    price: { type: Number, required: true, min: [0, "price can't be negative"] },
                    category: { type: String, required: true },
                },
            },
        ],
        status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
        orderNumber: { type: Number,default: 0 },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    },
    { timestamps: true }
);

var CounterSchema = Schema({
    counterid: { type: string, required: true },
    val: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

// Store in db a mini collection used for incrementing the order count (Like in MySQL auto increment)
OrdersSchema.pre('save', function(next) {
    const doc = this;
    counter.findByIdAndUpdate({counterid: 'orders'}, {$inc: { seq: 1} },{ new: true, upsert: true }, function(error, c)   {
        if(error)
            return next(error);
        doc.orderNumber = c.val;
        next();
    });
});

// Duplicate the ID field.
OrdersSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
OrdersSchema.set("toJSON", {
    virtuals: true,
});

export const ordersModel = mongoose.model(ordersCollection, OrdersSchema);
