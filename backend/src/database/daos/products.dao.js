import { productModel } from '../../models/product.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

export default class ProductsDaoMongo extends GenericDAOMongo {
    constructor() {
        if (!instance) {
            super(productModel)
            instance = this
        }
        return instance
    }
    
    async getByCode(code) {
        return await this.model.findOne({ code: code })
    }
}
