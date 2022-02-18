export class ProductDTO {
    constructor({name, description, photo, price, category}) {
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.price = price;
        this.category = category;
    }
}
