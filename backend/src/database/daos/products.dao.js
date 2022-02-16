import { productModel } from '../../models/product.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

export default class ProductsDaoMongo extends GenericDAOMongo {
    constructor() {
        super(productModel)
    }
}