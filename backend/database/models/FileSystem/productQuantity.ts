import Product from "./productModel";
import { IJSONParseable } from "./IJSONParseable";

// Requiero una interface para hacer overloading de los constructores (Asi puedo tener uno por defecto)
interface IProductQuantity{
    product:Product;
    quantity:number;
}

export default class ProductQuantity implements IJSONParseable<ProductQuantity>{
    product:Product;
    quantity:number;

    constructor(obj?: IProductQuantity){
        this.product=obj && obj.product || new Product();
        this.quantity=obj && obj.quantity || 0;
    }

    deserialize(input): ProductQuantity {
        this.quantity = input.quantity;
        this.product = new Product().deserialize(input.product);
        return this;
    }
}