import { cartModel } from '../../models/cart.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

export default class CartsDaoMongo extends GenericDAOMongo {
    constructor() {
        super(cartModel)
    }
}