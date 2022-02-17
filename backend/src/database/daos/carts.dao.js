import { cartModel } from "../../models/cart.model.js";
import GenericDAOMongo from "./generic.mongodb.dao.js";

let instance = null;
export default class CartsDaoMongo extends GenericDAOMongo {
    constructor() {
        if (!instance) {
            super(cartModel);
            instance = this;
        }
        return instance;
    }

    async getByUserId(userId) {
        return await this.model.findOne({ user: userId });
    }

    async getCartByIdWithProducts(cartId) {
        return await this.model.findOne({ _id: cartId }).populate("products.product");
    }
}
