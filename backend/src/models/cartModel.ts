import Product from "./productModel";



export default class Cart{
    id: number;
    timestramp: number;
    products: Array<number>;


    constructor(id: number= -1, products: Array<number> = []) {
        this.id = id
        this.timestramp = Date.now();
        this.products = products
    }

    addToCart(productId: number){
        const idx = this.products.findIndex(x=>x === productId)
        // Item no existe
        if(idx === -1){
            this.products.push(productId);
            return true;
        }
        else
            return false;
    }

    removeProduct(id: number): boolean{

        const idx = this.products.findIndex(x=>x === id)
        if(idx === -1)
            return false;
        else
            this.products = this.products.filter(x=>x != id);
        return true;
    }

    static fromJSON(cartJSON){

        const products = cartJSON['products'] ? cartJSON['products'] : [];
        return new Cart(cartJSON['id'],products)
    }
    
}