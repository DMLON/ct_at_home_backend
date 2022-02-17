import { productModel } from '../../models/product.model.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

let instance = null;
export default class ProductsDaoMongo extends GenericDAOMongo {
    constructor() {
        if (!instance) {
            super(productModel)
            instance = this
        }
        return instance
    }
    
    async getByName(name) {
        return await this.model.findOne({ name: name })
    }
}
