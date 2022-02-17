import { cartModel } from '../../models/cart.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

let instance = null;
export default class CartsDaoMongo extends GenericDAOMongo {
    constructor() {
        if (!instance) {
            super(cartModel)
            instance = this
        }
        return instance
    }
}
