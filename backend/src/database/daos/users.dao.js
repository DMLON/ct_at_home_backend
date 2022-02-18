import { userModel } from "../../models/users.model.js";
import { NotFound } from "../../utils/genericError.js";
import { loggerErrors } from "../../utils/loggers.js";
import GenericDAOMongo from "./generic.mongodb.dao.js";

let instance = null;


export default class UsersDaoMongo extends GenericDAOMongo {
    constructor() {
        if (!instance) {
            super(userModel);
            instance = this;
        }
        return instance;
    }

    async getByEmail(email) {
        const buscado = await this.model.findOne({ email: email });
        if (!buscado) {
            throw new NotFound("User",email);
        }
        return buscado;
    }

    async getByIdWithOrders(id) {
        const buscado = await this.model.findById(id).populate("orders");
        if (!buscado) {
            throw new NotFound("User",id);
        }
        return buscado;
    }

    async getByIdWithOrdersAndCart(id) {
        const buscado = await this.model.findById(id).populate("orders").populate("cart");
        if (!buscado) {
            throw new NotFound("User",id);
        }
        return buscado;
    }
}
