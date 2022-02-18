import { ordersModel } from "../../models/orders.model.js";
import { loggerErrors } from "../../utils/loggers.js";
import GenericDAOMongo from "./generic.mongodb.dao.js";

let instance = null;

export default class OrdersDaoMongo extends GenericDAOMongo {
    constructor() {
        if (!instance) {
            super(ordersModel);
            instance = this;
        }
        return instance;
    }

    async getAllWithUsers() {
        return await this.model.find().populate("user");
    }
}
