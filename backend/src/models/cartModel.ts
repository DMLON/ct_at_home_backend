import ProductQuantity from "./productQuantity";
import Product from "./productModel";

import { IJSONParseable } from "./IJSONParseable";

export default class Cart implements IJSONParseable<Cart>{
    id: number;
    timestramp: number;
    products: Array<ProductQuantity>;


    constructor(id: number= -1, products: Array<ProductQuantity> = []) {
        this.id = id
        this.timestramp = Date.now();
        this.products = products
    }
    deserialize(input): Cart {
        this.id = input.id;
        this.timestramp = input.timestramp;
        this.products = input.products.map(product=>new ProductQuantity().deserialize(product))
        return this;
    }

    addToCart(product: Product, quantity: number){
        const idx = this.products.findIndex(x=>x.product.id === product.id)
        // Item no existe
        if(idx === -1){
            this.products.push(new ProductQuantity({product,quantity}));
            return true;
        }
        else
            return false;
    }

    removeProduct(id: number): boolean{

        const idx = this.products.findIndex(x=>x.product.id === id)
        if(idx === -1)
            return false;
        else
            this.products = this.products.filter(x=>x.product.id != id);
        return true;
    }
}