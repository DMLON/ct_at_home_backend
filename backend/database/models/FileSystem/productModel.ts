import { IJSONParseable } from "./IJSONParseable";

// Requiero una interface para hacer overloading de los constructores (Asi puedo tener uno por defecto)
interface IProduct{
    id: number;
    timestramp: number;
    name: string;
    description: string;
    code: string;
    photo: string;
    price: number;
    stock: number;
}

export default class Product implements IJSONParseable<Product>{
    id: number;
    timestramp: number;
    name: string;
    description: string;
    code: string;
    photo: string;
    price: number;
    stock: number;

    
    constructor(obj?: IProduct) {
        this.id = obj && obj.id || -1
        this.timestramp = obj && obj.timestramp || Date.now();
        this.name = obj && obj.name || "";
        this.description = obj && obj.description || "";
        this.code = obj && obj.code || "";
        this.photo = obj && obj.photo || "";
        this.price = obj && obj.price || 0;
        this.stock = obj && obj.stock || 0;
    }

    deserialize(input) {
        this.id = input.id
        this.timestramp = input.timestramp || Date.now();
        this.name = input.name
        this.description = input.description
        this.code = input.code
        this.photo = input.photo
        this.price = input.price
        this.stock = input.stock
        return this;
    }
    
}