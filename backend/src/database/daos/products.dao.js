import { productModel } from '../../models/product.model.js';
import { NotFound } from '../../utils/genericError.js';
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
        const buscado = await this.model.findOne({ name: name })
        if (!buscado) {
            throw new NotFound("Product",name);
        }
        return buscado;
    }
}
