
export default class Product{
    id: number;
    timestramp: number;
    name: string;
    description: string;
    code: string;
    photo: string;
    price: number;
    stock: number;

    

    constructor(
        id: number, 
        name: string, 
        description: string, 
        code: string, 
        photo: string, 
        price: number, 
        stock: number
    ) {
        this.id = id
        this.timestramp = Date.now();
        this.name = name
        this.description = description
        this.code = code
        this.photo = photo
        this.price = price
        this.stock = stock
    }

    static fromJSON(productJSON){
        return new Product(
            productJSON['id'],
            productJSON['name'],
            productJSON['description'],
            productJSON['code'],
            productJSON['photo'],
            productJSON['price'],
            productJSON['stock'],
        )
    }

    
}